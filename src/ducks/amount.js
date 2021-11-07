//ACTIONS
export const CHANGE_AMOUNT_OVERLAY = 'CHANGE_AMOUNT_OVERLAY';

//ACTION CREATORS
export const ACTION_USE_AMOUNT = value => ({
  type: CHANGE_AMOUNT_OVERLAY,
  payload: value,
});

//REDUCERS
export const initialAmountState = {
  amount: {
    isOpen: false,
    product: '',
  },
};

export const amount = (prevState = initialAmountState, action) => {
  switch (action.type) {
    case CHANGE_AMOUNT_OVERLAY:
      return {
        ...prevState,
        amount: {
          isOpen: action.payload.isOpen,
          product: action.payload.product,
        },
      };
    default: 
      return {
        ...prevState,
      };
  }
}