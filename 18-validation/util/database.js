/**
 * @typedef ConnectionUriOptions
 * @type {Object}
 * @property {string | number} port
 * @property {string} hostname
 * @property {string} dbName
 * @property {string} dbType
 * @property {string} username
 * @property {string} passwords
 */

/**
 * Create the database-agnostic connection URI
 * @param {ConnectionUriOptions} options
 * @returns {string}
 */
function createDbConnectionUri(options) {
  const { dbType, dbName, hostname, port, username, password } = options;

  switch (dbType) {
    case "mongo":
    case "mongodb": {
      let uri;
      if (username && password) {
        uri = `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${hostname}:${port}/${dbName}`;
      } else {
        uri = `mongodb://${hostname}:${port}/${dbName}`;
      }
      return uri;
    }
    default:
      throw "Unsupported or empty database type defined.";
  }
}

module.exports = {
  createDbConnectionUri,
};
