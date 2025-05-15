import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Select, Spin } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Footer from '../components/Footer'; // Optional: comment this out if not used

const { Option } = Select;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const productRes = await axios.get('https://fakestoreapi.com/products');
    const categoryRes = await axios.get('https://fakestoreapi.com/products/categories');
    setProducts(productRes.data);
    setFiltered(productRes.data);
    setCategories(categoryRes.data);
    setLoading(false);
  };

  const handleCategoryChange = (value) => {
    if (value === 'all') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === value));
    }
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
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

        {loading ? (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Spin size="large" />
          </div>
        ) : (
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
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <Card.Meta title={product.title} description={`₹${product.price}`} />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
