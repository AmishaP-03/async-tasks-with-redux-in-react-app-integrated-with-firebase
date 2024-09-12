import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { fetchCartData, sendCartData } from './store/cart-slice.js';

var isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);

  // Fetch cart data from DB via action creator implemented as a thunk
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);


  // Runs whenever value of cart in store changes except for when the component is loaded for the first time 
  useEffect(() => {
    if (isInitial) {
      isInitial = !isInitial;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart)); // action creator
    }
  }, [cart, dispatch]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;