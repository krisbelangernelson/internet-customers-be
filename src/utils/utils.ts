import util from 'util'

export const stringifyInspect = (obj: object): string => util.inspect(obj, false, null).toString()
