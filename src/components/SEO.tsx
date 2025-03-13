import React from 'react';
import { Helmet } from 'react-helmet-async';
import logo from '../assets/logo.png';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title = '70mai Nha Trang - Đại lý phân phối camera hành trình chính hãng',
  description = 'Shop camera hành trình ô tô 70mai chính hãng tại Nha Trang. Đại lý phân phối thiết bị thông minh cho xe hơi, camera hành trình và phụ kiện chất lượng cao.',
  image = logo,
  url = 'https://70mai.vercel.app'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.png" />
    </Helmet>
  );
};

export default SEO; 