import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // adjust path

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <Card
      hoverable
      cover={<img alt={product.title} src={product.image} style={{ height: 200, objectFit: 'contain' }} />}
    >
      <Card.Meta title={product.title} description={`$${product.price}`} />
      <Button type="primary" onClick={() => dispatch(addToCart(product))} style={{ marginTop: 10 }}>
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
