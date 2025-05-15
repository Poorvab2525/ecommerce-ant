import { Card, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; // Redux action to add item to cart

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    // Ant Design Card to display product info
    <Card
      hoverable
      // Display product image with consistent height and containment
      cover={
        <img
          alt={product.title}
          src={product.image}
          style={{ height: 200, objectFit: 'contain' }}
        />
      }
    >
      {/* Product title and price */}
      <Card.Meta title={product.title} description={`$${product.price}`} />

      {/* Button to add product to cart */}
      <Button
        type="primary"
        onClick={() => dispatch(addToCart(product))}
        style={{ marginTop: 10 }}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
