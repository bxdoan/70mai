import json
import re
import os
import time
import random
from urllib.parse import urljoin
import logging
from curl_cffi import requests as cffi_requests
from bs4 import BeautifulSoup
import tempfile

# Thiết lập logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

class ProductCrawler:
    def __init__(self, base_url="https://70maivietnam.store/camera-hanh-trinh/", existing_products_file=None):
        self.base_url = base_url
        self.products = []
        self.next_id = 1  # Bắt đầu ID từ 1
        
        # Nếu có file sản phẩm hiện có, tải chúng và thiết lập ID tiếp theo
        if existing_products_file and os.path.exists(existing_products_file):
            self.load_existing_products(existing_products_file)
        
        # Danh sách trình duyệt để luân phiên
        self.browsers = [
            "chrome110", 
            "chrome120",
            "chrome99", 
            "chrome107", 
            "firefox110",
            "safari15_3", 
            "safari15_5"
        ]
        
        # Tạo thư mục để lưu cookies
        self.cookies_dir = os.path.join(os.getcwd(), "cookies")
        if not os.path.exists(self.cookies_dir):
            os.makedirs(self.cookies_dir)
        
        self.cookies_path = os.path.join(self.cookies_dir, "site_cookies.json")
        logger.info(f"Sẽ lưu cookies tại: {self.cookies_path}")
        
        # Thiết lập session với curl_cffi
        self.session = self.create_session()
        
        # Truy cập trang chủ trước để lấy cookie và thiết lập session
        self.warm_up_session()
        
    def create_session(self):
        """Tạo một session mới với impersonate ngẫu nhiên"""
        browser = random.choice(self.browsers)
        logger.info(f"Impersonate trình duyệt: {browser}")
        
        # Khởi tạo session mà không dùng tham số cookies_file
        session = cffi_requests.Session(
            impersonate=browser,
            timeout=30
        )
        
        # Nạp cookies từ file nếu đã có
        self.load_cookies_to_session(session)
        
        return session
    
    def load_cookies_to_session(self, session):
        """Nạp cookies từ file vào session"""
        if os.path.exists(self.cookies_path) and os.path.getsize(self.cookies_path) > 0:
            try:
                with open(self.cookies_path, 'r') as f:
                    cookies = json.load(f)
                
                # Thêm cookies vào session
                for cookie in cookies:
                    session.cookies.set(
                        cookie["name"],
                        cookie["value"],
                        domain=cookie.get("domain", "70maivietnam.store"),
                        path=cookie.get("path", "/")
                    )
                logger.info(f"Đã nạp {len(cookies)} cookies từ file")
            except Exception as e:
                logger.error(f"Lỗi khi đọc file cookies: {e}")
    
    def save_cookies_from_session(self):
        """Lưu cookies từ session vào file"""
        try:
            cookies_list = []
            for cookie in self.session.cookies:
                cookie_dict = {
                    "domain": cookie.domain,
                    "name": cookie.name,
                    "value": cookie.value,
                    "path": cookie.path,
                    "expires": cookie.expires if hasattr(cookie, 'expires') else None
                }
                cookies_list.append(cookie_dict)
            
            with open(self.cookies_path, 'w') as f:
                json.dump(cookies_list, f, indent=2)
            
            logger.info(f"Đã lưu {len(cookies_list)} cookies vào file")
        except Exception as e:
            logger.error(f"Lỗi khi lưu cookies: {e}")
    
    def warm_up_session(self):
        """Truy cập trang chủ để khởi động session và lấy cookies"""
        try:
            # Thử truy cập trang chủ 
            logger.info("Khởi động session bằng cách truy cập trang chủ...")
            
            # Thêm độ trễ tự nhiên
            time.sleep(random.uniform(2, 5))
            
            response = self.session.get(
                "https://70maivietnam.store/",
                allow_redirects=True
            )
            
            # Kiểm tra response
            if response.status_code == 200:
                logger.info("Đã truy cập thành công trang chủ và thiết lập session")
                # Lưu cookies sau khi truy cập thành công
                self.save_cookies_from_session()
            else:
                logger.warning(f"Không thể truy cập trang chủ, status code: {response.status_code}")
                
        except Exception as e:
            logger.error(f"Lỗi khi khởi động session: {e}")
        
    def get_headers(self):
        """Tạo headers ngẫu nhiên giống trình duyệt thật"""
        # Lấy ngẫu nhiên User-Agent từ các phiên bản Chrome phổ biến
        chrome_versions = ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101']
        edge_versions = ['95', '96', '97', '98', '99', '100', '101', '102']
        build_versions = ['1234567', '2345678', '3456789', '4567890', '5678901', '6789012']
        
        browser_type = random.choice(['chrome', 'edge'])
        
        if browser_type == 'chrome':
            version = random.choice(chrome_versions)
            build = random.choice(build_versions)
            user_agent = f'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version}.0.0.0 Safari/537.36'
        else:
            version = random.choice(edge_versions)
            build = random.choice(build_versions)
            user_agent = f'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/{version}.0.0.0 Safari/537.36 Edg/{version}.0.{build}.42'
        
        # Các headers thông thường của trình duyệt thật nhưng không quá đặc biệt
        headers = {
            'User-Agent': user_agent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
        }
        
        return headers

    def random_delay(self, min_seconds=3, max_seconds=8):
        """Tạo độ trễ ngẫu nhiên giữa các request"""
        delay_time = random.uniform(min_seconds, max_seconds)
        logger.info(f"Đợi {delay_time:.2f} giây trước request tiếp theo...")
        time.sleep(delay_time)
        
        # Thêm một khoảng dừng ngẫu nhiên thêm để giả lập hành vi người dùng
        if random.random() < 0.2:  # 20% cơ hội dừng lâu hơn
            extra_delay = random.uniform(2, 5)
            logger.info(f"Dừng thêm {extra_delay:.2f} giây để giả lập người dùng thật...")
            time.sleep(extra_delay)

    def get_soup(self, url, max_retries=3):
        """Tải nội dung trang và trả về đối tượng BeautifulSoup với khả năng thử lại"""
        for attempt in range(max_retries):
            try:
                # Thêm độ trễ ngẫu nhiên
                self.random_delay()
                
                logger.info(f"Đang truy cập {url} (lần thử {attempt+1}/{max_retries})")
                
                # Nếu đã thử nhiều lần không thành công, tạo session mới với trình duyệt khác
                if attempt > 0 and attempt % 2 == 0:
                    logger.info("Tạo session mới với trình duyệt khác...")
                    self.session = self.create_session()
                
                # Lấy headers ngẫu nhiên
                headers = self.get_headers()
                
                # Chuẩn bị các tham số request
                params = {
                    "allow_redirects": True,  # Tự động theo dõi chuyển hướng
                    "headers": headers,
                    "timeout": 30
                }
                
                # Sử dụng proxy nếu cần
                if attempt >= 2:  # Từ lần thử thứ 3 trở đi, thử dùng FlareSolverr
                    logger.info("Chuyển sang sử dụng chế độ xử lý đặc biệt cho Cloudflare...")
                    # Đối với curl_cffi, có thể tùy chỉnh thêm các tham số để xử lý challenge
                    params["impersonate"] = random.choice(self.browsers)
                
                # Thực hiện request
                response = self.session.get(url, **params)
                
                # Lưu cookies sau mỗi request thành công
                self.save_cookies_from_session()
                
                # Kiểm tra xem có bị chặn không
                if "google-site-verification" in response.text and "ahShtbihMenBMLaYugGP0oVNYB6rt5R0dyJbL1Uziis" in response.text:
                    logger.warning(f"Bị phát hiện là bot ở lần thử {attempt+1}. Thử với cấu hình khác...")
                    
                    # Nếu vẫn bị phát hiện là bot, thử cách tiếp cận khác
                    if attempt >= max_retries - 2:
                        logger.info("Thử phương pháp cuối cùng: trích xuất trực tiếp từ HTML...")
                        # Đối với một số trang, ta có thể trích xuất thông tin từ HTML ngay cả khi bị chặn
                        soup = BeautifulSoup(response.text, 'html.parser')
                        if self.is_usable_page(soup):
                            logger.info("Trang vẫn có thể trích xuất được thông tin!")
                            return soup
                    
                    # Độ trễ dài hơn trước khi thử lại
                    time.sleep(random.uniform(10, 20))
                    continue
                
                # Kiểm tra status code
                if response.status_code >= 400:
                    logger.error(f"Lỗi HTTP {response.status_code} khi truy cập {url}")
                    if attempt < max_retries - 1:
                        continue
                    else:
                        return None
                
                logger.info(f"Truy cập thành công: {url}")
                return BeautifulSoup(response.text, 'html.parser')
                
            except Exception as e:
                logger.error(f"Lỗi khi truy cập {url} (lần thử {attempt+1}): {e}")
                if attempt < max_retries - 1:
                    # Tăng thời gian chờ trước khi thử lại
                    wait_time = random.uniform(8, 20)
                    logger.info(f"Đợi {wait_time:.2f} giây trước khi thử lại...")
                    time.sleep(wait_time)
                else:
                    logger.error(f"Đã thử {max_retries} lần nhưng không thành công.")
                    return None
                    
        return None
    
    def is_usable_page(self, soup):
        """Kiểm tra xem trang HTML có chứa thông tin cần thiết không, ngay cả khi bị chặn"""
        # Ví dụ: kiểm tra xem có các phần tử HTML chứa nội dung sản phẩm không
        product_elements = soup.select('.product') or soup.select('.product-item') or soup.select('article.product')
        if product_elements:
            return True
            
        # Kiểm tra các tiêu đề sản phẩm
        title_elements = soup.select('.product_title') or soup.select('h1.product-title')
        if title_elements:
            return True
            
        return False
    
    def extract_price(self, price_text):
        """Trích xuất giá từ chuỗi text (ví dụ: '1.399.000₫' -> 1399000)"""
        if not price_text:
            return 0
        # Loại bỏ ký tự đặc biệt và chuyển thành số
        price = re.sub(r'[^\d]', '', price_text)
        return int(price) if price else 0
    
    def calculate_discount(self, price, original_price):
        """Tính phần trăm giảm giá"""
        if original_price <= 0 or price >= original_price:
            return 0
        return round(((original_price - price) / original_price) * 100)
    
    def get_product_links(self):
        """Lấy danh sách liên kết đến các trang sản phẩm"""
        product_links = []
        
        # Danh sách URLs sản phẩm đã biết - phòng trường hợp không crawl được
        backup_urls = [
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-m310/",
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-a510/",
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-a810/",
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-a200/",
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-omni/",
            "https://70maivietnam.store/camera-hanh-trinh/camera-hanh-trinh-70mai-a500s/"
        ]
        
        # Kiểm tra URL hiện tại có phải trang phân trang không
        is_pagination_url = "/page/" in self.base_url
        current_page = "trang phân trang" if is_pagination_url else "trang chính"
        logger.info(f"Đang crawl từ {current_page}: {self.base_url}")
        
        soup = self.get_soup(self.base_url)
        if not soup:
            logger.error(f"Không thể lấy danh sách sản phẩm từ {current_page}, sử dụng danh sách backup...")
            return backup_urls
        
        logger.info(f"Đang phân tích {current_page} để tìm sản phẩm...")
        
        # Tìm tất cả các liên kết sản phẩm trong trang
        # Thử nhiều selector khác nhau để tăng khả năng tìm thấy
        selectors = [
            '.product-grid-item', 
            '.product-item',
            '.products .product',
            '.products li',
            '.woocommerce-loop-product__link',
            'article.product',
            '.product a',
            'a[href*="camera-hanh-trinh"]',
            '.product-small.box'  # Thêm selector phổ biến cho theme WooCommerce
        ]
        
        found_products = False
        for selector in selectors:
            product_containers = soup.select(selector)
            if product_containers:
                logger.info(f"Tìm thấy {len(product_containers)} sản phẩm với selector '{selector}' trên {current_page}")
                found_products = True
                
                for container in product_containers:
                    if selector.endswith('a'):
                        # Nếu selector đã là thẻ a, sử dụng trực tiếp
                        link_element = container
                    else:
                        # Nếu không, tìm thẻ a bên trong
                        link_element = container.select_one('a[href]')
                        
                    if link_element and 'href' in link_element.attrs:
                        product_url = urljoin(self.base_url, link_element['href'])
                        # Kiểm tra xem URL có phải là URL sản phẩm hợp lệ không (bao gồm cả camera và phụ kiện)
                        valid_product_types = ["camera-hanh-trinh", "phu-kien-70mai", "bo-tich-dien", "tpms", "bom", "kich-binh"]
                        is_valid_product = any(product_type in product_url for product_type in valid_product_types)
                        
                        if is_valid_product and product_url not in product_links:
                            logger.info(f"Đã tìm thấy URL sản phẩm: {product_url}")
                            product_links.append(product_url)
                
                # Ghi lại số lượng sản phẩm tìm thấy với selector này
                logger.info(f"Đã tìm thấy {len(product_links)} sản phẩm hợp lệ với selector '{selector}' trên {current_page}")
                
                # NẾU đã tìm thấy đủ nhiều sản phẩm, có thể dừng lại
                if product_links:
                    logger.info(f"Đã tìm thấy đủ {len(product_links)} sản phẩm, dừng tìm kiếm thêm selector")
                    break
        
        if not found_products or not product_links:
            # Lưu lại HTML để debug
            debug_filename = "debug_category_page.html"
            if is_pagination_url:
                page_num = self.base_url.split("/page/")[1].split("/")[0]
                debug_filename = f"debug_category_page_{page_num}.html"
            
            self.save_debug_html(soup, debug_filename)
            logger.warning(f"Không tìm thấy sản phẩm nào trên {current_page}. Sử dụng danh sách backup...")
            return backup_urls
        
        logger.info(f"Đã tìm thấy tổng cộng {len(product_links)} sản phẩm trên {current_page}")
        return product_links
    
    def save_debug_html(self, soup, filename):
        """Lưu HTML để debug"""
        debug_dir = "debug"
        if not os.path.exists(debug_dir):
            os.makedirs(debug_dir)
        
        with open(os.path.join(debug_dir, filename), 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        logger.info(f"Đã lưu HTML debug vào {os.path.join(debug_dir, filename)}")
    
    def extract_product_info(self, product_url):
        """Trích xuất thông tin chi tiết của một sản phẩm từ URL"""
        soup = self.get_soup(product_url)
        if not soup:
            logger.error(f"Không thể lấy thông tin sản phẩm từ {product_url}")
            return None
        
        # Lưu HTML để debug nếu cần
        self.save_debug_html(soup, f"product_{self.next_id}.html")
        
        # Trích xuất thông tin cơ bản
        product = {
            "id": str(self.next_id),
            "category": "phu-kien-70mai"
        }
        self.next_id += 1
        
        # Lấy tên sản phẩm
        name_selectors = ['.product_title', 'h1.product-title', '.product-info h1', 'h1.entry-title']
        name_element = None
        for selector in name_selectors:
            name_element = soup.select_one(selector)
            if name_element:
                break
                
        # Nếu không tìm thấy tên từ selector, thử trích xuất từ URL
        if not name_element:
            # Trích xuất tên từ URL, ví dụ: camera-hanh-trinh-70mai-a810 -> 70mai A810
            url_parts = product_url.rstrip('/').split('/')
            if url_parts:
                last_part = url_parts[-1]
                if 'camera-hanh-trinh-' in last_part:
                    name_from_url = last_part.replace('camera-hanh-trinh-', '').replace('-', ' ').upper()
                    product["name"] = f"Camera hành trình {name_from_url}"
                else:
                    product["name"] = "Camera hành trình 70mai"
        else:
            product["name"] = name_element.text.strip()
            
        logger.info(f"Tên sản phẩm: {product['name']}")
        
        # Lấy giá hiện tại và giá gốc
        price_selectors = [
            '.price .woocommerce-Price-amount', 
            '.price ins .woocommerce-Price-amount',
            '.summary .price', 
            'p.price',
            '.price'
        ]
        
        price_element = None
        for selector in price_selectors:
            price_element = soup.select_one(selector)
            if price_element:
                break
                
        if price_element:
            product["price"] = self.extract_price(price_element.text)
        else:
            # Giá mặc định nếu không tìm được
            product["price"] = 1999000
            
        logger.info(f"Giá: {product['price']}")
        
        original_price_selectors = [
            '.price del .woocommerce-Price-amount',
            '.price .regular-price',
            '.summary .price del',
            'del .woocommerce-Price-amount'
        ]
        
        original_price_element = None
        for selector in original_price_selectors:
            original_price_element = soup.select_one(selector)
            if original_price_element:
                break
                
        if original_price_element:
            product["originalPrice"] = self.extract_price(original_price_element.text)
        else:
            # Nếu không có giá gốc, giả định giá gốc cao hơn giá hiện tại 10%
            product["originalPrice"] = int(product["price"] * 1.1)
        
        # Tính % giảm giá
        product["discount"] = self.calculate_discount(product["price"], product["originalPrice"])
        
        # Lấy URL ảnh
        image_selectors = [
            '.woocommerce-product-gallery__image img',
            '.product-gallery__image img',
            '.product-images img',
            '.woocommerce-main-image img',
            '.product-image img',
            'img.wp-post-image'
        ]
        
        image_element = None
        for selector in image_selectors:
            image_element = soup.select_one(selector)
            if image_element:
                break
                
        product["imageUrl"] = image_element['src'] if image_element and 'src' in image_element.attrs else ""
        if not product["imageUrl"] and image_element and 'data-src' in image_element.attrs:
            product["imageUrl"] = image_element['data-src']
            
        # Nếu vẫn không tìm được URL ảnh, dùng URL mặc định
        if not product["imageUrl"]:
            product["imageUrl"] = "https://70maivietnam.store/wp-content/uploads/2024/05/Dai-dien-70mai-A510-moi-580x580-1.jpg"
            
        logger.info(f"URL ảnh: {product['imageUrl']}")
        
        # Lấy mô tả
        description_selectors = [
            '.woocommerce-product-details__short-description',
            '.short-description',
            '.product-short-description',
            '.summary .description',
            '.description'
        ]
        
        description_element = None
        for selector in description_selectors:
            description_element = soup.select_one(selector)
            if description_element:
                break
        
        # Mô tả ngắn gọn
        short_description = description_element.text.strip() if description_element else "Camera hành trình 70mai chính hãng với chất lượng hình ảnh cao, nhiều tính năng thông minh giúp bảo vệ hành trình của bạn."
        
        # Lấy mô tả chi tiết sản phẩm từ div có class "uk-margin-small uk-container" và id="detail"
        detailed_description_element = soup.select_one('div.uk-margin-small.uk-container div#detail')
        if detailed_description_element:
            logger.info("Đã tìm thấy mô tả chi tiết sản phẩm")
            # Lưu cả HTML của phần mô tả chi tiết
            detailed_description_html = str(detailed_description_element)
            # Lưu cả text của phần mô tả chi tiết
            detailed_description_text = detailed_description_element.get_text(separator=' ', strip=True)
            # Lưu cả hai vào product
            product["description"] = short_description
            product["detailed_description_html"] = detailed_description_html
            product["detailed_description_text"] = detailed_description_text
        else:
            # Thử tìm với selector khác nếu không tìm thấy
            alternative_detail_element = soup.select_one('#detail') or soup.select_one('.entry-content') or soup.select_one('.product-description')
            if alternative_detail_element:
                logger.info("Đã tìm thấy mô tả chi tiết sản phẩm (selector thay thế)")
                detailed_description_html = str(alternative_detail_element)
                detailed_description_text = alternative_detail_element.get_text(separator=' ', strip=True)
                product["description"] = short_description
                product["detailed_description_html"] = detailed_description_html 
                product["detailed_description_text"] = detailed_description_text
            else:
                logger.warning("Không tìm thấy mô tả chi tiết sản phẩm")
                product["description"] = short_description
                product["detailed_description_html"] = ""
                product["detailed_description_text"] = ""
        
        # Lấy danh sách tính năng
        features = []
        feature_selectors = [
            '.product-short-description ul li',
            '.woocommerce-product-details__short-description ul li',
            '.woocommerce-Tabs-panel--description ul li',
            '.features-list li',
            '.description ul li'
        ]
        
        for selector in feature_selectors:
            feature_elements = soup.select(selector)
            if feature_elements:
                for feature in feature_elements:
                    feature_text = feature.text.strip()
                    if feature_text and len(feature_text) < 100:  # Chỉ lấy các mục ngắn gọn
                        features.append(feature_text)
                if features:  # Nếu đã tìm thấy features, thoát khỏi vòng lặp
                    break
        
        # Nếu không tìm thấy tính năng, thêm một số tính năng mặc định dựa trên loại sản phẩm
        if not features:
            if "A500" in product["name"] or "A510" in product["name"]:
                features = [
                    "Độ phân giải 2K/1440p",
                    "Cảm biến Sony",
                    "Góc quay rộng 140°",
                    "Giám sát đỗ xe thông minh",
                    "Kết nối WiFi với điện thoại"
                ]
            elif "A800" in product["name"] or "A810" in product["name"]:
                features = [
                    "Độ phân giải 4K Ultra HD",
                    "Cảm biến Sony IMX415",
                    "Góc quay rộng 140°",
                    "Giám sát đỗ xe thông minh 24h",
                    "Kết nối WiFi nhanh"
                ]
            else:
                features = [
                    "Độ phân giải Full HD 1080p",
                    "Góc quay rộng 140°",
                    "Giám sát đỗ xe thông minh",
                    "Dễ dàng cài đặt và sử dụng",
                    "Thiết kế nhỏ gọn"
                ]
                
        product["features"] = features[:5] if features else ["Không có thông tin"]
        logger.info(f"Đã tìm thấy {len(features)} tính năng")
        
        # Giả định tồn kho ngẫu nhiên
        product["stock"] = random.randint(5, 25)
        
        # Lấy thông số kỹ thuật
        specifications = {
            "brand": "70mai",
        }
        
        # Trích xuất model từ tên sản phẩm
        model_match = re.search(r'70mai\s+(\w+\d*)', product["name"], re.IGNORECASE)
        if model_match:
            specifications["model"] = model_match.group(1)
        else:
            # Thử các pattern khác
            model_match = re.search(r'(A\d+|M\d+|S\d+|Pro[+\s]*\w*|Omni)', product["name"], re.IGNORECASE)
            if model_match:
                specifications["model"] = model_match.group(1)
            else:
                # Thử trích xuất từ URL
                for model_code in ["A500", "A510", "A800", "A810", "M300", "M310", "A200", "S500", "Omni"]:
                    if model_code.lower() in product_url.lower():
                        specifications["model"] = model_code
                        break
                else:
                    specifications["model"] = "Unknown"
        
        # Thêm thông số từ bảng thông số kỹ thuật nếu có
        specs_selectors = [
            '.woocommerce-product-attributes-item',
            '.product_meta tr',
            '.product-attributes tr',
            '#tab-additional_information tr',
            '.shop_attributes tr'
        ]
        
        for selector in specs_selectors:
            specs_table = soup.select(selector)
            if specs_table:
                for spec in specs_table:
                    label_selectors = [
                        '.woocommerce-product-attributes-item__label',
                        'th',
                        '.label',
                        'strong'
                    ]
                    value_selectors = [
                        '.woocommerce-product-attributes-item__value',
                        'td',
                        '.value'
                    ]
                    
                    label = None
                    for label_selector in label_selectors:
                        label = spec.select_one(label_selector)
                        if label:
                            break
                            
                    value = None
                    for value_selector in value_selectors:
                        value = spec.select_one(value_selector)
                        if value:
                            break
                            
                    if label and value:
                        key = label.text.strip().lower().replace(' ', '_')
                        specifications[key] = value.text.strip()
                
                # Nếu đã tìm thấy thông số, thoát khỏi vòng lặp
                if len(specifications) > 1:
                    break
        
        # Thêm một số thông số mặc định nếu không có đủ thông tin
        if "resolution" not in specifications:
            if "A500" in product["name"] or "A510" in product["name"]:
                specifications["resolution"] = "2K 1440p"
            elif "A800" in product["name"] or "A810" in product["name"]:
                specifications["resolution"] = "4K 2160p"
            elif "Omni" in product["name"]:
                specifications["resolution"] = "4K 2160p"
            else:
                specifications["resolution"] = "Full HD 1080p"
                
        if "sensor" not in specifications:
            if "A500" in product["name"] or "A800" in product["name"] or "A810" in product["name"]:
                specifications["sensor"] = "Sony IMX335"
            elif "Omni" in product["name"]:
                specifications["sensor"] = "Sony IMX415"
            else:
                specifications["sensor"] = "High-quality Image Sensor"
                
        if "storage" not in specifications:
            specifications["storage"] = "Hỗ trợ thẻ nhớ đến 128GB (không kèm theo)"
            
        if "connectivity" not in specifications:
            specifications["connectivity"] = "Wi-Fi"
            
        if "power" not in specifications:
            specifications["power"] = "5V/2A"
            
        product["specifications"] = specifications
        
        logger.info(f"Đã lấy thông tin sản phẩm thành công: {product['name']}")
        return product
    
    def crawl_products(self):
        """Crawl tất cả sản phẩm và lưu vào danh sách"""
        product_links = self.get_product_links()
        logger.info(f"Tìm thấy {len(product_links)} liên kết sản phẩm")
        
        for url in product_links:
            logger.info(f"Đang crawl: {url}")
            product = self.extract_product_info(url)
            if product:
                self.products.append(product)
                logger.info(f"Đã thêm sản phẩm {product['name']} vào danh sách")
            else:
                logger.warning(f"Không thể lấy thông tin sản phẩm từ {url}")
            
            # Tạm dừng để tránh quá tải server
            self.random_delay(5, 15)
        
        return self.products
    
    def save_to_json(self, output_file="products_crawled.json"):
        """Lưu danh sách sản phẩm vào file JSON"""
        # Đếm số sản phẩm mới được thêm vào
        if os.path.exists(output_file):
            try:
                with open(output_file, 'r', encoding='utf-8') as f:
                    old_products = json.load(f)
                old_count = len(old_products)
                new_count = len(self.products) - old_count
            except Exception:
                old_count = 0
                new_count = len(self.products)
        else:
            old_count = 0
            new_count = len(self.products)
        
        # Lưu danh sách sản phẩm đã cập nhật
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(self.products, f, ensure_ascii=False, indent=2)
        
        logger.info(f"Đã lưu {len(self.products)} sản phẩm vào {output_file} (Cũ: {old_count}, Mới: {new_count})")

    def load_existing_products(self, file_path):
        """Tải danh sách sản phẩm từ file JSON hiện có và thiết lập ID tiếp theo"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                existing_products = json.load(f)
                
            if existing_products:
                self.products = existing_products
                # Tìm ID lớn nhất trong danh sách hiện có
                max_id = 0
                for product in existing_products:
                    try:
                        product_id = int(product.get("id", "0"))
                        max_id = max(max_id, product_id)
                    except ValueError:
                        continue
                
                # Thiết lập ID tiếp theo
                self.next_id = max_id + 1
                logger.info(f"Đã tải {len(existing_products)} sản phẩm hiện có. ID tiếp theo: {self.next_id}")
        except Exception as e:
            logger.error(f"Lỗi khi tải sản phẩm hiện có: {e}")
            # Nếu có lỗi, vẫn tiếp tục với danh sách trống và ID từ 1


if __name__ == "__main__":
    # Tạo thư mục để lưu kết quả nếu chưa tồn tại
    output_dir = "data"
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Đường dẫn đến file sản phẩm hiện có
    existing_products_file = os.path.join(output_dir, "products_crawled.json")
    
    # Khởi tạo crawler và bắt đầu crawl
    try:
        # Khởi tạo crawler với URL trang 2 và file sản phẩm hiện có
        crawler = ProductCrawler(
            base_url="https://70maivietnam.store/phu-kien-camera/",
            existing_products_file=existing_products_file
        )
        
        # Crawl sản phẩm từ trang 2
        new_products = crawler.crawl_products()
        
        if new_products:
            # Lưu kết quả (sẽ bao gồm cả sản phẩm cũ và mới)
            crawler.save_to_json(existing_products_file)
            logger.info(f"Quá trình crawl hoàn tất thành công! Đã thêm sản phẩm mới vào {existing_products_file}")
        else:
            logger.error("Không tìm thấy sản phẩm nào để lưu.")
    except Exception as e:
        logger.exception(f"Lỗi không xử lý được trong quá trình crawl: {e}")
