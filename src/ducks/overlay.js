//ACTIONS
export const CHANGE_OVERLAY_STATE = 'CHANGE_OVERLAY_STATE';

//ACTION CREATORS
export const ACTION_CHANGE_OVERLAY_STATE = value => ({
  type: CHANGE_OVERLAY_STATE,
  payload: value,
});

//REDUCERS
export const initialOverlayState = {
  isOverlayOpen: false,
};

export const isOverlayOpen = (prevState = initialOverlayState, action) => {
  switch (action.type) {
    case CHANGE_OVERLAY_STATE:
      return {
        ...prevState,
        isOverlayOpen: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}