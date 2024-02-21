import util from 'util'

/**
 *  String of util.inspect object
 *  @param {Object} obj - Object to process
 *  @returns {String} - String of the inspected object
 */
export const stringifyInspect = (obj: object): string => util.inspect(obj, false, null).toString()
