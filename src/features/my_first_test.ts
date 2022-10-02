import {Selector} from 'testcafe'

import {config} from '../config'
import {logger} from '../logger'

fixture`Getting Started`.page`${config.appBaseUrl.firstTest}`
  .meta('fixtureID', 'myFirstTest')
  .meta({author: 'Butel Benjamin'})

test('My first test', async t => {
  logger.info('Starting test "My first Test"')
  await t
    .typeText('#developer-name', 'John Smith')
    .click('#submit-button')

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector('#article-header').innerText)
    .eql('Thank you, John Smith!')
  logger.info('End of test "My first Test"')
})
