const { MongoClient } = require("mongodb");
const config = require("./config");

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(config.db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Correctly connected to the database!");
    const db = client.db();
    const collection = db.collection("chinese-food");
    return { client, collection };
  } catch (e) {
    console.log(e.message);
  }
};

const insert = async (document) => {
  const conection = await connectDB();
  const { collection } = conection;
  let result;
  if (document instanceof Array) {
    //document.map((doc) => (doc.movieId = uniqid()));
    result = await collection.insertMany(document);
  } else {
    //document.movieId = uniqid();
    result = await collection.insertOne(document);
  }
  conection.client.close();
  return result;
};

const update = async (document, newDocument) => {
  const conection = await connectDB();
  const { collection } = conection;
  let result = await collection.updateOne(document, { $set: newDocument });
  conection.client.close();
  return result;
};

const remove = async (document) => {
  const conection = await connectDB();
  const { collection } = conection;
  let result = await collection.deleteOne(document);
  conection.client.close();
  return result;
};

const find = async (document) => {
  const conection = await connectDB();
  const { collection } = conection;

  let result =
    document === undefined
      ? await collection.find().toArray()
      : await collection.find(document).toArray();

  result === null && (result = {});
  conection.client.close();
  return result;
};

module.exports = {
  insert: insert,
  find: find,
  update: update,
  remove: remove,
};
