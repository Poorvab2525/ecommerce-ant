import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Select, Skeleton, message, Input, Pagination } from 'antd';
import ProductCard from './ProductCard';

const { Option } = Select;
const { Search } = Input;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [searchText, setSearchText] = useState('');

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

  const applyFilters = (category, search) => {
    let filteredData = products;

    if (category && category !== 'all') {
      filteredData = filteredData.filter(p => p.category === category);
    }

    if (search && search.trim() !== '') {
      filteredData = filteredData.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(filteredData);
    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    applyFilters(value, searchText);
  };

  const onSearch = (value) => {
    setSearchText(value);
    applyFilters(undefined, value);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentProducts = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Latest Products</h2>

      <Row justify="center" gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Search
            placeholder="Search products"
            allowClear
            enterButton="Search"
            size="middle"
            onSearch={onSearch}
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              if (e.target.value === '') {
                applyFilters(undefined, '');
              }
            }}
          />
        </Col>
        <Col xs={24} sm={8} md={6}>
          <Select
            defaultValue="all"
            onChange={handleFilter}
            style={{ width: '100%' }}
          >
            <Option value="all">All Categories</Option>
            {categories.map(cat => (
              <Option key={cat} value={cat}>
                {cat.toUpperCase()}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      <Row gutter={[16, 16]} justify="center">
        {loading ? (
          Array.from({ length: pageSize }).map((_, i) => (
            <Col xs={24} sm={12} md={8} lg={6} key={i}>
              <Skeleton active />
            </Col>
          ))
        ) : currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <p style={{ textAlign: 'center', width: '100%' }}>No products found.</p>
        )}
      </Row>

      {!loading && filtered.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={page => setCurrentPage(page)}
          style={{ marginTop: 24, textAlign: 'center' }}
          showSizeChanger={false}
        />
      )}
    </>
  );
};

export default ProductList;
