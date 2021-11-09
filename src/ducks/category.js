//ACTIONS
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const CREATE_CATEGORY_LIST = 'CREATE_CATEGORY_LIST';

//ACTION CREATORS
export const ACTION_CHANGE_CATEGORY = value => ({
  type: CHANGE_CATEGORY,
  payload: value,
});

export const ACTION_CREATE_CATEGORY_LIST = value => ({
  type: CREATE_CATEGORY_LIST,
  payload: value,
});

//REDUCERS
export const initialCategoryState = {
  category: null,
  categories: null,
};

export const category = (prevState = initialCategoryState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...prevState,
        category: action.payload,
      };
    case CREATE_CATEGORY_LIST:
      return {
        ...prevState,
        categories: action.payload,
      };
    default: 
      return {
        ...prevState,
      };
  }
}