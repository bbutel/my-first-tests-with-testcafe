import {hotelApp} from '../app/hotel'
import {config} from '../config'
import {logger} from '../logger'

fixture`Getting Started`.page`${config.appBaseUrl.hotel}`.meta('fixtureID', 'hotel-message')

test('Send a message to hotel owners', async () => {
  logger.info('Starting test "Send a message to hotel owners"')
  const myClient = hotelApp.dataGenenator.client()
  const myMessage = hotelApp.dataGenenator.contactMessage()
  await hotelApp.sendAContactMessage(myClient, myMessage)
  await hotelApp.checkThatContactMessageIsCorrectlySent(myClient)
  logger.info('End of test "Send a message to hotel owners"')
})
