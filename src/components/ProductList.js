// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Select, Skeleton, message } from 'antd';
import ProductCard from './ProductCard';


const { Option } = Select;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        setProducts(res.data);
        setFiltered(res.data);
        const uniqueCats = [...new Set(res.data.map(p => p.category))];
        setCategories(uniqueCats);
      } catch (err) {
        message.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (value) => {
    if (value === 'all') {
      setFiltered(products);
    } else {
      setFiltered(products.filter(p => p.category === value));
    }
  };

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Latest Products</h2>

      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Select
          defaultValue="all"
          onChange={handleFilter}
          style={{ width: 200 }}
        >
          <Option value="all">All</Option>
          {categories.map((cat) => (
            <Option key={cat} value={cat}>{cat.toUpperCase()}</Option>
          ))}
        </Select>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Skeleton active />
            </Col>
          ))
        ) : (
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
