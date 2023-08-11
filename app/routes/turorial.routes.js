module.exports = (app) => {
  const linkedInUsers = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new LinkedInUsers
  router.post("/", linkedInUsers.create);

  // Retrieve all Tutorials
  router.get("/", linkedInUsers.findAll);

  // Retrieve all published Tutorials
  router.get("/published", linkedInUsers.findAllPublished);

  // Retrieve a single LinkedInUsers with id
  router.get("/:id", linkedInUsers.findOne);

  // Retrieve a single LinkedInUsers with id
  router.get("/isexist/:username", linkedInUsers.findByUsername);

  // Update a LinkedInUsers with id
  router.put("/:id", linkedInUsers.update);

  // Delete a LinkedInUsers with id
  router.delete("/:id", linkedInUsers.delete);

  // Create a new LinkedInUsers
  router.delete("/", linkedInUsers.deleteAll);

  app.use("/api/linkedInUsers", router);
};
