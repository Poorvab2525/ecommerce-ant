import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Spin, Slider, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const { Option } = Select;
const { Title } = Typography;

const HomePage = () => {
  // State variables
  const [products, setProducts] = useState([]); // All fetched products
  const [filtered, setFiltered] = useState([]); // Products after applying filters
  const [categories, setCategories] = useState([]); // Available categories from API
  const [loading, setLoading] = useState(true); // Loading state for spinner

  const [selectedCategory, setSelectedCategory] = useState('all'); // Currently selected category filter
  const [priceRange, setPriceRange] = useState([0, 1000]); // Currently selected price range

  const navigate = useNavigate(); // React Router navigation hook

  // Fetch data on initial render
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch products and categories from the API
  const fetchData = async () => {
    const productRes = await axios.get('https://fakestoreapi.com/products');
    const categoryRes = await axios.get('https://fakestoreapi.com/products/categories');

    setProducts(productRes.data);
    setFiltered(productRes.data);
    setCategories(categoryRes.data);
    setLoading(false);
  };

  // Handle category change from dropdown
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    applyFilters(value, priceRange);
  };

  // Apply both category and price range filters to product list
  const applyFilters = (category, range) => {
    let filteredList = [...products];

    // Filter by category if not "all"
    if (category !== 'all') {
      filteredList = filteredList.filter(p => p.category === category);
    }

    // Filter by price range
    filteredList = filteredList.filter(p =>
      p.price >= range[0] && p.price <= range[1]
    );

    setFiltered(filteredList); // Update the filtered product list
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        {/* Category Filter Dropdown */}
        <Select
          defaultValue="all"
          value={selectedCategory}
          style={{ width: 200, marginBottom: '20px', marginRight: '20px' }}
          onChange={handleCategoryChange}
        >
          <Option value="all">All</Option>
          {categories.map(cat => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>

        {/* Price Range Slider */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={5}>
            Filter by Price (₹{priceRange[0]} – ₹{priceRange[1]})
          </Title>
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={(range) => {
              setPriceRange(range); // Update slider state
              applyFilters(selectedCategory, range); // Reapply filters
            }}
            style={{ width: 300 }}
          />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
          // Product Grid Layout
          <Row gutter={[16, 16]}>
            {filtered.map(product => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={product.title}
                      src={product.image}
                      style={{ height: '250px', objectFit: 'contain' }}
                    />
                  }
                  // Navigate to product detail page on click
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Meta
                    title={product.title}
                    description={`₹${product.price}`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Footer Component */}
      <Footer />
    </>
  );
};

export default HomePage;
