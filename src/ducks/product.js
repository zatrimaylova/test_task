//ACTIONS
export const CHANGE_PRODUCT = 'CHANGE_PRODUCT';

//ACTION CREATORS
export const ACTION_CHANGE_PRODUCT = value => ({
  type: CHANGE_PRODUCT,
  payload: value,
});

//REDUCERS
export const initialProductState = {
  product: '',
};

export const product = (prevState = initialProductState, action) => {
  switch (action.type) {
    case CHANGE_PRODUCT:
      return {
        ...prevState,
        product: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}