//ACTIONS
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

//ACTION CREATORS
export const ACTION_CHANGE_CATEGORY = value => ({
  type: CHANGE_CATEGORY,
  payload: value,
});

//REDUCERS
export const initialCategoryState = {
  category: null,
};

export const category = (prevState = initialCategoryState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...prevState,
        category: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}