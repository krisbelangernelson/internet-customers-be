import type { ServerConfigType } from './types'

const env: string = process.env.APP_ENV ?? 'local'

const config: { default: ServerConfigType } = require(`./${env}`) // eslint-disable-line

export default config.default
