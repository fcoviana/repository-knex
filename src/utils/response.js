/**
 * @typedef {Object} QueryBuilderResponse
 * @property {boolean} success If the call returned success or error
 * @property {any} data Result of the QueryBuilder call
 * @property {boolean} error Return error that occurred
 */

/**
 * Response normalizer
 * @param {boolean} success
 * @param {any} data
 * @param {any} error
 * @return {QueryBuilderResponse}
 */
exports.response = ({ success, data = null, error = false }) => {
  return { success, data, error };
};
