import { combineReducers } from 'redux';

import { currency } from '../ducks/currency';
import { cart } from '../ducks/cart';
import { product } from '../ducks/product';
import { category } from '../ducks/category';
import { isOverlayOpen } from '../ducks/overlay';
import { warning } from '../ducks/warning';
import { adding } from '../ducks/adding';

export default combineReducers({
  currency,
  cart,
  product,
  category,
  isOverlayOpen,
  warning,
  adding,
});