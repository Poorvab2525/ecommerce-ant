import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography, Button, Spin } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';  


const { Title, Paragraph } = Typography;

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  if (!product) return <Title level={3}>Product not found</Title>;

  // Handle the "Add to Cart" action
  const handleAddToCart = () => {
    dispatch(addToCart(product));  // Dispatch the addToCart action
  };

  return (
    <div style={{ padding: '20px', maxWidth: 800, margin: 'auto' }}>
      <Card
        cover={
          <img
            alt={product.title}
            src={product.image}
            style={{ maxHeight: '400px', objectFit: 'contain', margin: 'auto' }}
          />
        }
      >
        <Title level={2}>{product.title}</Title>
        <Title level={4}>₹{product.price}</Title>
        <Paragraph>{product.description}</Paragraph>

        {/* Add to Cart button */}
        <Button type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default ProductPage;
