//ACTIONS
export const CHANGE_CURRENCY = 'CHANGE_CURRENCY';

//ACTION CREATORS
export const ACTION_CHANGE_CURRENCY = value => ({
  type: CHANGE_CURRENCY,
  payload: value,
});

//REDUCERS
export const initialCurrencyState = {
  currency: '',
};

export const currency = (prevState = initialCurrencyState, action) => {
  switch (action.type) {
    case CHANGE_CURRENCY:
      return {
        ...prevState,
        currency: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}