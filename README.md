This project aims to help you starting with UI automation testing tool TestCafe (https://testcafe.io/)

This project contains following content:
- what is TestCafe ?
- an how-to for installation and configuration
- a first basic test to explain how TestCafe works
- a guide to fill a form with TestCafe
- a more complex test with login then adding a product to a cart

# What is TestCafe ?

TestCafe is an UI automation testing tool.

It works under NodeJS and scripts are written in Javascript or Typescript.

It acts like a proxy between the browser and the system under test (SUT) : Browser <=> TestCafe <=> SUT
That's why all interactions you will find provided samples of this repo are asynchronous (keywords async and await).

You can find more information here: https://testcafe.io/documentation/402631/why-testcafe

## TestCafe keywords

Useful keywords are available to write a test.

**fixture** : to declare a fixture. You can add additional information to fixture like:
* page ! to add a default URL starting page
* meta: to add additional information to your fixture context.

**test** : to declare a test. You can add additional information:
* meta: to add additional information to your test context.

**hooks** : You can declare before and after hooks at different level:
* global run level
* fixture level
* test level

TestCafe provides a way to share data accross hooks and tests:
* test run context 
* fixture context
* test context

You can find more information here: https://testcafe.io/documentation/402831/guides/basic-guides/test-structure

# Installation

## Prerequisites

You need to install NodeJS  (https://nodejs.org/): I use version 16

I also use **yarn** as a package manager.
```bash
npm install -g yarn
```

## Installation

```bash
yarn install
```

# Development environment

## Typescript

I use Typescript to help me find code issues directly during the coding.
That's why I use type to describe business models.

Version 2.0 of TestCafe uses its own version of typescript (V4) and its own typescript configuration.
That's mean that TestCafe don't require any other typescript configuration to transpile code at runtime.

However, it could be useful, during code, to detect typescript transpilation issues throught your IDE (I use VSCode).
That's why you'll find the file tsconfig.ts that provides this configuration.

To run the check of transpilation:
```sh
yarn typecheck
```

## Linters

In order to keep the code beauty, I use eslint and prettier.
Both configurations are avalaible into files prettier.config.js and .eslintrc.js

If you use VSCode, I recommand you to install ESLint extension and configure your IDE to apply linting each time you save the code.

To run the lint with auto fix when possible:
```sh
yarn lint
```

## dead code checking

Because we have to deal with code, I provide you a script, based on package **prune**, to check that no dead code still remains.
```sh
yarn check:deadCode
```

## Unit testing

For some reason, you could have the need to unit test some specific functional modules or functions.

I used to unit test each function that does not depend on TestCafe UI modules/functions. These last ones are coverage throught TestCafe tests themselves.

A specific configuration is provided for **jest**, a unit testing package: jest.config.js and test/tsconfig.json

You can run all tests:
```
yarn test
```

## TestCafe 

TestCafe provides a configuration file ```.testcaferc.json`` to reduce the number of parameter to give through CLI.
In this file, you can find:
- browser you want to use
- reporters (including video recording)
- and so many others options that you can find on official site of TestCafe: https://testcafe.io/documentation/402638/reference/configuration-file#settings

### Running a fixture 

As mentioned above, TestCafe provides keywords.

I usually used them like this:
* fixture: to run severals tests as a test suite focused on a feature
* test: to run a scenario of my feature

I add meta data **fixtureID** and use it to run a specific feature.

For instance, to run a specific fixture which fixtureId is 'myFixture':
```sh
testcafe src/features --fixture-meta fixtureID=myFixture
```

In my examples, I use a logger to add additional logs during test runs. 
In order to set logger level, a .env file is used.

.env file are used to declare some enrivonment variables. So If you want to add others var env, you can use this .env file.

To be sure that .env file will be used during TestCafe running, I add a dedicated script in the package.json.
So you can run a fixture which fixtureId is 'myFixture' like this:
```sh
feature-dotenv fixtureID=myFixture
```

## Package structure

```
|_src
  |_app       # I put in this folder all business modules I need to describe applications under test
  |_ config   # Here, global configuration for the project
  |_ features # I put in this folder all end-to-end tests that use TestCafe
  |_ logger   # Here, a logger to help debugging
|_test       # Here, we've got unit testing for some dedicated functional modules
```

## Configuration of logger

If you want to change the logger level, you can update .env file with one of following level: 'debug', 'info', 'warn', 'error'.

Note that logger is based on packages pino and pino-pretty.

# Write fixtures and tests with TestCafe

## My first test

For this first test, I just customize the test that TestCafe provides to its community.

the test is here:  **src/features/my_first_test.ts**

Its fixtureId is **myFirstTest**

You can run it like this:
```sh
yarn feature-dotenv fixtureID=myFirstTest
# You can also use a provided shorcut script in package.json
yarn my-first-test
```

Some explanation about the customization:
- I add the logger to show you how you can use it
- I extract baseUrl in a dedicated object called config: I do that because if someday, the baseUrl will change, it is easier to modify it once than in each script file.

```ts
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
```

TestCafe works with a context called testController and represented above by the parameter **t**.
You can chain TestCafe actions **t.click(...).typetext(...).click(.....)**

All actions are described on TestCafe officla documentation: https://testcafe.io/documentation/402665/reference/test-api/testcontroller

## Second test: How to fill a form with TestCafe

### Description of test itself

To explain how to run a form with TestCafe, it use a web site dedicated to automation pratice: https://automationintesting.online/
Behind this site, we've got an hotel reservation web site.

Our test checks the contact form by sending a message to hotel owners.

You can run the test like this:
```sh
yarn hotel-message
```

The test is avalaible here: **src/features/send_a_message_to_hotel.ts**

```ts
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
```

I create an abstraction to describe the product. That's why you don't find any TestCafe UI functions.
My abstraction focuses on product interactions. It is inspired by screenplay pattern. 

Screenplay pattern is a very useful pattern to focuses on business actors and product actions. 
In opposite of Page Object Model that focuses on web site pages, screenplay pattern has the advantage to describe only the part of pages we need.

In my test, I do not implement screenplay pattern. It will be overkill to do that. That's why I just create this abstraction focuses on actions.
If you want to learn more about screenplay pattern, I invite you to follow John Ferguson Smart on LinkedIn.

So let's me describe my abstraction:
- dataGenenator is a generic data generator that provides some useful business objects aka a hotel client and a contact message
- sendAContactMessage: abstraction of real UI interactions to send a contact message
- checkThatContactMessageIsCorrectlySent: abstraction of real UI interactions to check that a message is sent

The true code of these abstractions are avalaible here: **src/app/hotel**

### Description of product abstraction code

```ts
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
```

As you can see, TestCafe interaction are abstracted into our both business functions.
Note I import TestCafe controller at the begining of file with an alias. Indeed, I'not a big fan of name **t** and prefer to use a better explicit name for controller.

### Description of business data generator

```ts
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
```

As you can see, it is a function that does not rely on TestCafe. That's why I've got unit tests against it.

#### Unit testing of data generator

These unit tests are avalaible here: **test/hotel**

```ts
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
```

I was inspired by Pierre Criulanscy to organize my unit test with a SUT abstraction.

## Dealing with a more complex test: login then add an item to a cart

### Description of test istself

For this test, I use following test site web: https://www.demoblaze.com/

I already created a user for this test. So no need to create it again.

```ts
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
```

Here, you can see that I create a SUT object in order to abstract test steps implementation.
It's a way to create a readiness test (but not the only one way ;) )

You can also see that the real implementation of steps are described in productStore object that contains:
* a login function that takes a credential object as parameter.
* functions to add and check a product in cart
* a function to clean cart

You can also see that TestCafe provides some useful functions to run code before test (**before** keyword) and after test (keyword **after**).

# Conclusion

In this repo, I just show you how you can start with TestCafe with some samples.
My way to code is just a proposal. Feel free to have your own style and be aware that the best code is the one your team could understand and collaborate with.
So don't be afraid to ask reviews from you team :)

About TestCafe, you can do more complex stuff and a lot of addons exists. For instance:
- gherkin-testcafe : to write your test with Gherkin syntax
- testcafe-browser-provider-browserstack: to plug your tests on browsers provided by BrowserStack