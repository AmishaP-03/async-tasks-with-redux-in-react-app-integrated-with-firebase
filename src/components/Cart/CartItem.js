import { useDispatch, useSelector } from 'react-redux';

import classes from './CartItem.module.css';
import { cartActions, sendCartData } from '../../store/cart-slice';

const CartItem = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { title, quantity, total, price, id } = props.item;

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));

    // Set updated cart in DB
    dispatch(sendCartData(cart)); // action creator
  };

  const addItemHandler = () => {
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
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;