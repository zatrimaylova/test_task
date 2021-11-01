//ACTIONS
export const USE_WARNING_OVERLAY = 'USE_WARNING_OVERLAY';

//ACTION CREATORS
export const ACTION_USE_WARNING = value => ({
  type: USE_WARNING_OVERLAY,
  payload: value,
});

//REDUCERS
export const initialWarningState = {
  warning: false,
};

export const warning = (prevState = initialWarningState, action) => {
  switch (action.type) {
    case USE_WARNING_OVERLAY:
      return {
        ...prevState,
        warning: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}