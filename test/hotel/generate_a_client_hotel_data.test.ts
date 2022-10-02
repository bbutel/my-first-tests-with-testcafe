import {test} from '@jest/globals'

import {hotelApp} from '../../src/app/hotel'
import {ContactMessage} from '../../src/app/hotel/types'

let sut: SUT

beforeEach(() => {
  sut = createSut()
})

describe('FEATURE: Generate client hotel data', () => {
  describe('RULE: generated contact message should contains a subject and a description', () => {
    test('EXAMPLE: message has a randomized subject and description', () => {
      sut.whenMessageIsGenerated()

      sut.messageShouldContainFollowingAttributes(['subject', 'description'])
    })
  })
  describe('RULE: message subject should be a sentence with a minimum size of 5 characters', () => {
    test('EXAMPLE: message subject could be something like "message subject"', () => {
      sut.whenMessageIsGenerated()

      sut.messageSubjectShouldBeCorrect()
    })
  })
  describe('RULE: message description should be a paragraph with a least 20 characters', () => {
    test('EXAMPLE:  message description could be something like "My message description is an awesome description"', () => {
      sut.whenMessageIsGenerated()

      sut.messageDescriptionShouldBeCorrect()
    })
  })
})

const createSut = () => {
  let message: ContactMessage
  return {
    whenMessageIsGenerated() {
      message = hotelApp.dataGenenator.contactMessage()
    },
    messageShouldContainFollowingAttributes(attributes: string[]) {
      attributes.forEach(attribute => {
        expect(Object.prototype.hasOwnProperty.call(message, attribute)).toBeTruthy()
      })
    },
    messageSubjectShouldBeCorrect() {
      expect(message.subject.length).toBeGreaterThanOrEqual(5)
    },
    messageDescriptionShouldBeCorrect() {
      expect(message.description.length).toBeGreaterThanOrEqual(20)
    },
  }
}

type SUT = ReturnType<typeof createSut>
