const { ObjectID } = require("mongodb");
const { insert, find, update, remove } = require("../../../database");

exports.create = async (req, res, next) => {
  const { body } = req;
  try {
    var doc = await insert(body.document);

    res.status(201);
    res.json({
      success: true,
      message: "Succesfully inserted to the database!",
      data: doc.ops,
    });
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
    next(new Error(error));
  }
};

exports.retrieve = async (req, res, next) => {
  const { query } = req;

  try {
    let document;
    if (Object.keys(query).includes("name")) {
      document = { name: query.name };
    } else if (Object.keys(query).includes("id")) {
      if (query.id.length === 24) {
        document = { _id: new ObjectID(query.id) };
      } else {
        document = { id: query.id };
      }
    } else if (Object.keys(query).length === 0) {
      document = null;
    } else if (Object.keys(query).length > 0) {
      document = undefined;
    }
    if (document !== undefined) {
      var doc = await find(document);
      res.status(201);
      res.json({
        success: true,
        message:
          query.name === null
            ? doc.length +
              " document(s) found in collection'" +
              query.collection +
              "'!"
            : doc.length + " document(s) found with name '" + query.name + "'!",
        data: doc,
      });
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "Data not allowed!",
      });
    }
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
    next(new Error(error));
  }
};

exports.update = async (req, res, next) => {
  const { body } = req;
  try {
    if (body.document.id !== undefined) {
      var doc = await update(
        { _id: new ObjectID(body.document.id) },
        body.newDocument
      );
      if (doc.acknowledged === true) {
        res.status(201);
        res.json({
          success: true,
          message: "Succesfully updated!",
          dataUpdated: body.newDocument,
        });
      } else {
        res.status(404);
        res.json({
          success: false,
          message: "The id given was not found!",
        });
      }
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "Bad request!",
      });
    }
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
    next(new Error(error));
  }
};

exports.remove = async (req, res, next) => {
  const { body } = req;
  try {
    if (body.document.id !== undefined) {
      var doc = await remove({ _id: new ObjectID(body.document.id) });
      if (doc.deletedCount > 0) {
        res.status(201);
        res.json({
          success: true,
          message: "Succesfully deleted!",
          dataUpdated: body.newDocument,
        });
      } else {
        res.status(404);
        res.json({
          success: false,
          message: "The id given was not found!",
        });
      }
    } else {
      res.status(400);
      res.json({
        success: false,
        message: "Bad request!",
      });
    }
  } catch (error) {
    res.status(500);
    res.json({
      success: false,
      message: "Internal server error!",
      error: error,
    });
    next(new Error(error));
  }
};
