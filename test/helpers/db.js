const db = require('../../src/models/db/db');

// const QueryFile = require('pg-promise').queryFile;
// const path = require('path');

// reset db tables in tests
// seed db in tests - find data in the folder test/seed/contacts.sql and load it into contacts_test

// const truncateTables = () => {
//   if (process.env.NODE_ENV === 'production') {
//     throw new Error('dont do it');
//   }
//   const tables = ['contacts', 'users'];
//   return Promise.all(tables.map(table => db.none(`TRUNCATE ${table} RESET IDENTITY`)));
// };
// // function sql(file) {
//   // generating full path
//   const fullPath = path.join(__dirname, file);
//   return new QueryFile(fullPath);
// }
//
// const seedFiles = {
//   contacts: sql('../seed/contacts.sql'),
//   users: sql('../seed/users.sql'),
//   addresses: sql('../seed/addresses.sql'),
// };
// //
// const seedTables = () => db.none(seedFiles.contacts)
//   .then(() => db.none(seedFiles.users))
//   .then(() => db.none(seedFiles.addresses));


const table = ['contacts'];

const truncateTable = () => {
  return db.none(`
    TRUNCATE ${table} RESTART IDENTITY;
  `);
};

// const initData = {
//   contacts: sql('../seed/contacts.sql'),
// }
//
//need to redo this - read seed data directly from file ('../seed/contacts.sql')
const loadTable = () => {
  return db.none
  // (initData.contacts);
  (`
    INSERT INTO ${table} (first_name, last_name)
    VALUES
    ('Jared', 'Grippe'),
    ('Tanner', 'Welsh'),
    ('NeEddra', 'James');
  `);
};


const resetTable = () => truncateTable().then(() => loadTable());

module.exports = { truncateTable, resetTable };
