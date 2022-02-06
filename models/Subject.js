const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const SubjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, "Subject name must be at least 3 characters. "],
      trim: true,
      required: [true, "Please add a name for your subject. "],
    },
    searchKeywords: [
      {
        type: String,
        trim: true,
        select: false,
      },
    ],
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

SubjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Subject", SubjectSchema);
