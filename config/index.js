const { dbNoSQLConnection } = require('./dbNoSQL');
const constants = require('./constants');

module.exports = {
    dbNoSQLConnection,
    ...constants
}