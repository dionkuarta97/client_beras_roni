import { SET_CATEGORY, SET_CATEGORY_SELECT } from "./CategoryType";

const initialState = {
  category: {
    loading: false,
    data: null,
    error: null,
  },
  categorySelect: {
    loading: false,
    data: null,
    error: null,
  },
};

const CategoryReducer = (state = initialState, action) => {
  if (action.type === SET_CATEGORY) {
    return { ...state, category: action.payload };
  } else if (action.type === SET_CATEGORY_SELECT) {
    return { ...state, categorySelect: action.payload };
  }
  return state;
};

export default CategoryReducer;
