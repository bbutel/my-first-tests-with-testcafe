import {Selector, t as testController} from 'testcafe'

type credential = {
  login: string
  password: string
}
export const login = async (credential: credential) => {
  await testController
    .click('#login2')
    .typeText('#loginusername', credential.login)
    .typeText('#loginpassword', credential.password)
    .click('#logInModal button[class*="btn-primary"]') // TODO: Need a better way to select this button
    .expect(Selector('#nameofuser').innerText)
    .contains(credential.login)
  return
}
