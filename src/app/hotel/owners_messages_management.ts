import {Selector, t as testController} from 'testcafe'

import {logger} from '../../logger'

import {Client, ContactMessage} from './types'

export const sendAContactMessage = async (client: Client, message: ContactMessage) => {
  try {
    logger.info('Starting to fill hotel contact form')
    await testController
      .typeText('[data-testid="ContactName"]', client.name)
      .typeText('[data-testid="ContactEmail"]', client.email)
      .typeText('[data-testid="ContactPhone"]', client.phone)
      .typeText('[data-testid="ContactSubject"]', message.subject)
      .typeText('[data-testid="ContactDescription"]', message.description)
      .click('#submitContact')
    logger.info('Hotel contact form submitted')
  } catch (error) {
    logger.error(`Something wrong during hotel contact form submitting`)
    throw error
  }
}

export const checkThatContactMessageIsCorrectlySent = async (client: Client) => {
  try {
    logger.info('Checking that contact form has been correctly send')
    await testController.expect(Selector('.contact').innerText).contains(client.name)
    logger.info('Contact form seems to be correctly send')
  } catch (error) {
    logger.error(`Something wrong during checking hotel contact form send`)
    throw error
  }
}
