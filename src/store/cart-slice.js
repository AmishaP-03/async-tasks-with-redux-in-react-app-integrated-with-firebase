import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

// Action creators to handle async tasks, returns another func which will then be executed by redux
export const sendCartData = (cart) => {
    return async (_dispatch) => {
        // We could dispatch an action here to set pending notification data in ui slice
    
        // Async task
        try {
            const response = await fetch('https://redux-in-react-ca2f4-default-rtdb.firebaseio.com/cart.json', {
                method: "PUT",
                body: JSON.stringify(cart)
            });

            if (!response.ok) {
                alert("Sending cart data failed!");
                // We could instead dispatch action to set the error notification data in ui slice. This would call the reducer in the flow of an async task,
                // without making us writre async logic inside a reducer
            } else {
                alert("Items successfully added to cart!");
            }
        } catch (error) {
            alert(error.message);
            // We could instead dispatch action to set the error notification data in ui slice
        }
    };
}

export const cartActions = cartSlice.actions;

export default cartSlice;