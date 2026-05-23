/**
 * @typedef ConnectionUriOptions
 * @type {Object}
 * @property {string | number} port
 * @property {string} hostname
 * @property {string} dbName
 * @property {string} dbType
 */

/**
 * Create the database-agnostic connection URI
 * @param {ConnectionUriOptions} options
 * @returns {string}
 */
function createDbConnectionUri(options) {
  const { dbType, dbName, hostname, port } = options;

  switch (dbType) {
    case "mongo":
    case "mongodb":
      return `mongodb://${hostname}:${port}/${dbName}`;
    default:
      throw "Unsupported or empty database type defined.";
  }
}

module.exports = {
  createDbConnectionUri,
};
