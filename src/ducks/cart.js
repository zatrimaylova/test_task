//ACTIONS
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CHANGE_COUNT = 'CHANGE_COUNT';

//ACTION CREATORS
export const ACTION_ADD_PRODUCT = value => ({
  type: ADD_PRODUCT,
  payload: value,
});

export const ACTION_CHANGE_COUNT = value => ({
  type: CHANGE_COUNT,
  payload: value,
});

export const ACTION_DELETE_PRODUCT = value => ({
  type: DELETE_PRODUCT,
  payload: value,
});

//REDUCERS
export const initialCartState = {
  cart: [],
};

export const cart = (prevState = initialCartState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...prevState,
        cart: [...prevState.cart, action.payload],
      };

    case CHANGE_COUNT: 
      return {
        ...prevState,
        cart: prevState.cart.map((item) => {
          return (
            item.name === action.payload.name && item.cartItemId === Number(action.payload.cartItemId) ? action.payload : item
          )
        })
      };

    case DELETE_PRODUCT:
      return {
        ...prevState,
        cart: prevState.cart.filter((item) => item.cartItemId !== action.payload)
      };

    default: 
      return {
        ...prevState,
      };
  }
}