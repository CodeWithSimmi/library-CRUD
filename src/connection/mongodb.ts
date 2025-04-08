const { MongoClient } = require("mongodb");
const { database } = require("../config");

const client = new MongoClient(database);

async function booksdb() {
  const connect = await client.connect();

  const databaseconnect = connect.db("simran-database");
  return databaseconnect.collection("books-store");
}

module.exports = { booksdb };
