import {faker} from '@faker-js/faker'

import {logger} from '../../../logger'
import {Client, ContactMessage} from '../types'

const generateClient = (): Client => {
  const client = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    phone: faker.phone.number('+############'),
  }
  logger.debug(client, 'Creation of following client')
  return client
}

const generateContactMessage = (): ContactMessage => {
  const message = {
    subject: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
  }
  logger.debug(message, 'Creation of following message')
  return message
}

export const dataGenenator = {
  client: generateClient,
  contactMessage: generateContactMessage,
}
