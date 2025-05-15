import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To access the dynamic URL parameter
import { Card, Typography, Button, Spin } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';  // Redux action to add product to cart

const { Title, Paragraph } = Typography;

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State to store the product details
  const [loading, setLoading] = useState(true); // State to manage loading spinner
  const dispatch = useDispatch(); // Get Redux dispatch function

  // Fetch product data when component mounts or `id` changes
  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        setProduct(res.data); // Save the fetched product data
        setLoading(false);    // Stop loading
      })
      .catch(() => setLoading(false)); // Handle any error and stop loading
  }, [id]);

  // Show spinner while loading
  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  // Show message if product is not found
  if (!product) return <Title level={3}>Product not found</Title>;

  // Handle the "Add to Cart" button click
  const handleAddToCart = () => {
    dispatch(addToCart(product)); // Add product to Redux store cart
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
        {/* Product Title */}
        <Title level={2}>{product.title}</Title>

        {/* Product Price */}
        <Title level={4}>₹{product.price}</Title>

        {/* Product Description */}
        <Paragraph>{product.description}</Paragraph>

        {/* Add to Cart Button */}
        <Button type="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
      </Card>
    </div>
  );
};

export default ProductPage;
