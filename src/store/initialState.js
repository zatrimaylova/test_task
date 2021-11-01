import { initialCurrencyState } from '../ducks/currency';
import { initialCartState } from '../ducks/cart';
import { initialProductState } from '../ducks/product';
import { initialCategoryState } from '../ducks/category';
import { initialOverlayState } from '../ducks/overlay';
import { initialWarningState } from '../ducks/warning';

export const initialState = {
  currency: initialCurrencyState,
  cart: initialCartState,
  product: initialProductState,
  category: initialCategoryState,
  isOverlayOpen: initialOverlayState,
  warning: initialWarningState,
};