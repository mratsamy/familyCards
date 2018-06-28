// to load built-in models into the DB, run this using node one time, `node create-lb-tables`
var server = require('../server/server');
var ds = server.dataSources.db;

// avoid migrating the `User` table as the app has its own `user` table
var lbTables = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
  process.exit()
});