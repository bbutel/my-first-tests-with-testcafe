import {Selector, t as testController} from 'testcafe'

type product = {
  type: 'Laptops'
  name: string
  price: number
}

type productItem = Pick<product, 'type'> & Pick<product, 'name'>

export const addProductToCart = async (product: productItem) => {
  await testController
    .click(Selector('#itemc').withText(product.type)) // TODO: Need a better way to select this item
    .click(Selector('.card-title').withText(product.name)) // TODO: Need a better way to select this item
    .setNativeDialogHandler(() => true)
    .click(Selector('a').withText('Add to cart')) // TODO: Need a better way to select this item
  return
}

export const cartContainsProduct = async (product: product) => {
  await testController
    .click(Selector('.nav-link').withText('Cart')) // TODO: Need a better way to select this item
    .expect(Selector('#tbodyid').innerText)
    .contains(product.name)
    .expect(Selector('#tbodyid').innerText)
    .contains(product.price.toString())
  return
}

export const cleanCart = async () => {
  await testController.click(Selector('a').withText('Delete')) // TODO: Need a better way to select this item
  return
}
