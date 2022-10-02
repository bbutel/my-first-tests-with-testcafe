import {addProductToCart, cartContainsProduct, cleanCart} from './cart_management'
import {login} from './login'

export const productStore = {
  login,
  addProductToCart,
  cartContainsProduct,
  cleanCart,
}
