import { useDispatch, useSelector } from 'react-redux';

import { cartActions, sendCartData } from '../../store/cart-slice';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { title, price, description, id } = props;

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
      })
    );

    // Set updated cart in DB
    dispatch(sendCartData(cart)); // action creator
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;