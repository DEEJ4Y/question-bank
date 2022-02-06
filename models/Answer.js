const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

const AnswerSchema = new mongoose.Schema(
  {
    answer: {
      type: String,
      minLength: [3, "Answer must be at least 3 characters. "],
      trim: true,
      required: [true, "Please add an answer. "],
    },
    searchKeywords: [
      {
        type: String,
        trim: true,
        select: false,
      },
    ],
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Question",
    },
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

AnswerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Answer", AnswerSchema);
