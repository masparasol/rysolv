const pullRequests = `CREATE TABLE IF NOT EXISTS
pullRequests(
  id UUID PRIMARY KEY,
  created_date TIMESTAMP,
  modified_date TIMESTAMP,
  title VARCHAR(128) NOT NULL,
  body VARCHAR(128) NOT NULL,
  repo VARCHAR(128) NOT NULL
)`;

module.exports = pullRequests;