import { initialCurrencyState } from '../ducks/currency';
import { initialCartState } from '../ducks/cart';
import { initialProductState } from '../ducks/product';
import { initialCategoryState } from '../ducks/category';

export const initialState = {
  currency: initialCurrencyState,
  cart: initialCartState,
  product: initialProductState,
  category: initialCategoryState,
};