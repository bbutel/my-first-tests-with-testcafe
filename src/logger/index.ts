import {pino} from 'pino'
import pretty from 'pino-pretty'

import {config} from '../config'

const pinoPretty = pretty({
  colorize: true,
})
export const logger = pino(
  {
    level: config.logger.level,
    nestedKey: 'data',
  },
  pinoPretty
)
