const mongoose = require("mongoose");

const toDOSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", toDOSchema);
