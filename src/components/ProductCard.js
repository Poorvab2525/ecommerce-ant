import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <Card title={product.title} cover={<img alt="product" src={product.image} height="200" />}>
        <p>{product.description.slice(0, 60)}...</p>
        <p><strong>${product.price}</strong></p>
      </Card>
    </Link>
  );
};

export default ProductCard;
