/* eslint-disable @typescript-eslint/no-use-before-define */
import {productStore} from '../app/productStore'
import {config} from '../config'
import {logger} from '../logger'

fixture`Getting Started`.page(config.appBaseUrl.productShop).meta('fixtureID', 'cart-item')

let sut: SUT

test
  .before(async () => {
    sut = createSut()
  })('Send a message to hotel owners', async () => {
    logger.info('Starting test "Add an item to a cart"')
    await sut
      .givenFollowingProductExists({type: 'Laptops', name: 'Sony vaio i5', price: 790})
      .givenFollowingUserIsLoggedIn({
        login: 'testcafe@testcafe.test',
        password: 'testcafe@testcafe.test',
      })

    await sut.whenHeAddsPreviousProductToHisCart()

    await sut.thenHisCartShouldContainsThisProduct()

    logger.info('End of test "Add an item to a cart"')
  })
  .after(async () => {
    await sut.clean()
  })

const createSut = () => {
  let product: {type: 'Laptops'; name: string; price: number}
  return {
    async givenFollowingUserIsLoggedIn(credentials: {login: string; password: string}) {
      await productStore.login(credentials)
    },
    givenFollowingProductExists(_product: {type: 'Laptops'; name: string; price: number}) {
      product = _product
      return this
    },
    async whenHeAddsPreviousProductToHisCart() {
      await productStore.addProductToCart(product)
      return this
    },
    async thenHisCartShouldContainsThisProduct() {
      await productStore.cartContainsProduct(product)
      return this
    },
    async clean() {
      await productStore.cleanCart()
    },
  }
}

type SUT = ReturnType<typeof createSut>
