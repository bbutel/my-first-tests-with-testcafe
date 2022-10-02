export const config = {
  appBaseUrl: {
    hotel: 'https://automationintesting.online/',
    firstTest: 'https://devexpress.github.io/testcafe/example',
    productShop: 'https://www.demoblaze.com',
  },
  logger: {
    level: `${process.env.LOGGER_LEVEL || 'info'}`,
  },
}
