import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Select, Skeleton, message } from 'antd';
import ProductCard from './ProductCard';

const { Option } = Select;

const ProductList = () => {
  // State to hold all products
  const [products, setProducts] = useState([]);

  // State for filtered product list (based on category)
  const [filtered, setFiltered] = useState([]);

  // Loading state for API request
  const [loading, setLoading] = useState(true);

  // State to store unique product categories
  const [categories, setCategories] = useState([]);

  // Fetch product data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching products from fakestoreapi
        const res = await axios.get('https://fakestoreapi.com/products');

        // Store full list and set initial filtered list
        setProducts(res.data);
        setFiltered(res.data);

        // Extract unique categories from product list
        const uniqueCats = [...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCats);
      } catch (err) {
        message.error('Failed to load products'); // Show error toast
      } finally {
        setLoading(false); // Turn off loading spinner
      }
    };
    fetchData();
  }, []);

  // Handle category filter change
  const handleFilter = (value) => {
    if (value === 'all') {
      setFiltered(products); // Show all products
    } else {
      // Filter products by selected category
      setFiltered(products.filter(p => p.category === value));
    }
  };

  return (
    <>
      {/* Section Title */}
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Latest Products</h2>

      {/* Category Filter Dropdown */}
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Select
          defaultValue="all"
          onChange={handleFilter}
          style={{ width: 200 }}
        >
          <Option value="all">All</Option>
          {categories.map((cat) => (
            <Option key={cat} value={cat}>
              {cat.toUpperCase()}
            </Option>
          ))}
        </Select>
      </div>

      {/* Responsive product grid */}
      <Row gutter={[16, 16]} justify="center">
        {/* Show skeletons while loading */}
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Skeleton active />
            </Col>
          ))
        ) : (
          // Render filtered product cards
          filtered.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};

export default ProductList;
