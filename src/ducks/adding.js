//ACTIONS
export const USE_ADDING_COMP = 'USE_ADDING_COMP';

//ACTION CREATORS
export const ACTION_USE_ADDING = value => ({
  type: USE_ADDING_COMP,
  payload: value,
});

//REDUCERS
export const initialAddingState = {
  adding: {
    isOpen: false,
    product: '',
  },
};

export const adding = (prevState = initialAddingState, action) => {
  switch (action.type) {
    case USE_ADDING_COMP:
      return {
        ...prevState,
        adding: {
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