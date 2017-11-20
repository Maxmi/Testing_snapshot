const db = require('../../src/models/db/db');
const { QueryFile } = require('pg-promise');
const path = require('path');

// Helper for linking to external query files:
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;
  return new QueryFile(fullPath);
}

// if later need to add more tables - add them to this array
const table = ['contacts'];

// if need to truncate many tables - use map function to go over all of them
const truncateTable = () => db.none(`
    TRUNCATE ${table} RESTART IDENTITY;
  `);

// reading data from external file
const loadTable = () => db.none(sql('../seed/contacts.sql'));

// in case we don't have external file with test data we could load them here
// const loadTable = () => db.none(`
//     INSERT INTO ${table} (first_name, last_name)
//     VALUES
//     ('Jared', 'Grippe'),
//     ('Tanner', 'Welsh'),
//     ('NeEddra', 'James');
//   `);


const resetTable = () => truncateTable().then(() => loadTable());

module.exports = { truncateTable, resetTable };
