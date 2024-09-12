import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { fetchCartData } from './store/cart-slice.js';

// var isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  // Fetch cart data from DB via action creator implemented as a thunk
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;