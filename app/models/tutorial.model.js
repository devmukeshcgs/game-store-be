module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: String,
      description: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const LinkedInUsers = mongoose.model("linkedInUsers", schema);
  return LinkedInUsers;
};
