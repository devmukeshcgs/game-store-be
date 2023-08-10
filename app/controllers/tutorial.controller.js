const db = require("../models");
const LinkedInUsers = db.linkedInUsers;

// Create and Save a new LinkedInUsers
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a LinkedInUsers
  const linkedInUsers = new LinkedInUsers({
    username: req.body.username,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  // Save LinkedInUsers in the database
  linkedInUsers
    .save(linkedInUsers)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the LinkedInUsers.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username
    ? { username: { $regex: new RegExp(username), $options: "i" } }
    : {};

  LinkedInUsers.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving linkedInUsers.",
      });
    });
};

// Find a single LinkedInUsers with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LinkedInUsers.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found LinkedInUsers with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving LinkedInUsers with id=" + id });
    });
};

// Update a LinkedInUsers by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  LinkedInUsers.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update LinkedInUsers with id=${id}. Maybe LinkedInUsers was not found!`,
        });
      } else res.send({ message: "LinkedInUsers was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating LinkedInUsers with id=" + id,
      });
    });
};

// Delete a LinkedInUsers with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  LinkedInUsers.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete LinkedInUsers with id=${id}. Maybe LinkedInUsers was not found!`,
        });
      } else {
        res.send({
          message: "LinkedInUsers was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete LinkedInUsers with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  LinkedInUsers.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all linkedInUsers.",
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  LinkedInUsers.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving linkedInUsers.",
      });
    });
};
