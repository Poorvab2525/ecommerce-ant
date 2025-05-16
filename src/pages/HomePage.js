import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer'; 
const { Option } = Select;

const HomePage = () => {
  // State to hold all products fetched from API
  const [products, setProducts] = useState([]);

  // State to hold currently filtered products
  const [filtered, setFiltered] = useState([]);

  // State to hold product categories for filtering
  const [categories, setCategories] = useState([]);

  // State to track loading spinner visibility
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); // Hook to programmatically navigate between routes

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch products and categories from fakestoreapi
  const fetchData = async () => {
    const productRes = await axios.get('https://fakestoreapi.com/products');
    const categoryRes = await axios.get('https://fakestoreapi.com/products/categories');

    // Set products and categories
    setProducts(productRes.data);
    setFiltered(productRes.data); // Initially show all products
    setCategories(categoryRes.data);
    setLoading(false);
  };

  // Handle category filter selection
  const handleCategoryChange = (value) => {
    if (value === 'all') {
      setFiltered(products); // Show all products
    } else {
      // Filter products by selected category
      setFiltered(products.filter(p => p.category === value));
    }
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* Dropdown for category filter */}
        <Select
          defaultValue="all"
          style={{ width: 200, marginBottom: '20px' }}
          onChange={handleCategoryChange}
        >
          <Option value="all">All</Option>
          {categories.map(cat => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>

        {/* Show loading spinner while fetching data */}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          // Responsive grid of product cards
          <Row gutter={[16, 16]}>
            {filtered.map(product => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  // Product image with consistent size and containment
                  cover={
                    <img
                      alt={product.title}
                      src={product.image}
                      style={{ height: '250px', objectFit: 'contain' }}
                    />
                  }
                  // Navigate to product detail page on card click
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Meta
                    title={product.title}
                    description={`₹${product.price}`} // Display price
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Optional footer section */}
      {<Footer /> }
    </>
  );
};

export default HomePage;
