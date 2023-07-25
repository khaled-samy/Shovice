const mongoose = require("mongoose");
const moment = require("moment");

const mesasgeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

mesasgeSchema.virtual("timeSince").get(function () {
  return moment(this.createdAt).fromNow();
});

module.exports = mongoose.model("Message", mesasgeSchema);
