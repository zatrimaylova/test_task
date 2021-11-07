//ACTIONS
export const USE_REMOVING_OVERLAY = 'USE_REMOVING_OVERLAY';

//ACTION CREATORS
export const ACTION_USE_REMOVING = value => ({
  type: USE_REMOVING_OVERLAY,
  payload: value,
});

//REDUCERS
export const initialRemovingState = {
  removing: {
    isOpen: false,
    product: '',
  },
};

export const removing = (prevState = initialRemovingState, action) => {
  switch (action.type) {
    case USE_REMOVING_OVERLAY:
      return {
        ...prevState,
        removing: {
          isOpen: action.payload.isOpen,
          product: action.payload.product,
        }
      };
    default: 
      return {
        ...prevState,
      };
  }
}