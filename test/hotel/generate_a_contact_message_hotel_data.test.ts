import {test} from '@jest/globals'

import {hotelApp} from '../../src/app/hotel'
import {Client} from '../../src/app/hotel/types'

let sut: SUT

beforeEach(() => {
  sut = createSut()
})

describe('FEATURE: Generate an hotel contact message data', () => {
  describe('RULE: generated message should contains a name, an email and a phone number', () => {
    test('EXAMPLE: client has a randomized name, email and phone number', () => {
      sut.whenClientIsGenerated()

      sut.clientShouldContainFollowingAttributes(['name', 'email', 'phone'])
    })
  })
  describe('RULE: client name is composed of a firstname and a lastname separated by a space', () => {
    test('EXAMPLE: client name could be something like "John Smith"', () => {
      sut.whenClientIsGenerated()

      sut.clientNameShouldBeCorrect()
    })
  })
  describe('RULE: client email should respect email format', () => {
    test('EXAMPLE: client email could be something like "John.Smith@johnsmith.com"', () => {
      sut.whenClientIsGenerated()

      sut.clientEmailShouldBeCorrect()
    })
  })
  describe('RULE: client phone is composed of a + character followed by 12 digits ', () => {
    test('EXAMPLE: client phone could be something like "+331234567890"', () => {
      sut.whenClientIsGenerated()

      sut.clientPhoneShouldBeCorrect()
    })
  })
})

const createSut = () => {
  let client: Client
  return {
    whenClientIsGenerated() {
      client = hotelApp.dataGenenator.client()
    },
    clientShouldContainFollowingAttributes(attributes: string[]) {
      attributes.forEach(attribute => {
        expect(Object.prototype.hasOwnProperty.call(client, attribute)).toBeTruthy()
      })
    },
    clientNameShouldBeCorrect() {
      expect(client.name).toMatch(/^[a-zA-Z]+\s[a-zA-Z']+$/)
    },
    clientEmailShouldBeCorrect() {
      expect(client.email).toMatch(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    },
    clientPhoneShouldBeCorrect() {
      expect(client.phone).toMatch(/^\+[0-9]{12}$/)
    },
  }
}

type SUT = ReturnType<typeof createSut>
