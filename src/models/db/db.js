const pgp = require('pg-promise')()

// const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'

const connectionString = {
  host: 'localhost',
  port: 5432,
  database: process.env.NODE_ENV === 'test' ? 'contacts_test' : 'contacts'
}

const db = pgp(connectionString)

module.exports = db
