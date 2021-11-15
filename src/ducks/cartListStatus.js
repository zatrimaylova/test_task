//ACTIONS
export const USE_ADDING_COMP = 'USE_ADDING_COMP';
export const CHANGE_AMOUNT_OVERLAY = 'CHANGE_AMOUNT_OVERLAY';
export const USE_REMOVING_OVERLAY = 'USE_REMOVING_OVERLAY';

//ACTION CREATORS
export const ACTION_USE_ADDING = value => ({
  type: USE_ADDING_COMP,
  payload: value,
});
export const ACTION_USE_AMOUNT = value => ({
  type: CHANGE_AMOUNT_OVERLAY,
  payload: value,
});
export const ACTION_USE_REMOVING = value => ({
  type: USE_REMOVING_OVERLAY,
  payload: value,
});

//REDUCERS
export const initialCartListStatusState = {
  adding: '',
  amount: '',
  removing: '',
};

export const cartListStatus = (prevState = initialCartListStatusState, action) => {
  switch (action.type) {
    case USE_ADDING_COMP:
      return {
        ...prevState,
        adding: action.payload,
      };
    case CHANGE_AMOUNT_OVERLAY:
      return {
        ...prevState,
        amount: action.payload,
      };
    case USE_REMOVING_OVERLAY:
      return {
        ...prevState,
        removing: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}