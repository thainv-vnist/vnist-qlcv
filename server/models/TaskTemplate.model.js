const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User.model');

// Create Schema
const TaskTemplateSchema = new Schema({
    name: { //Tên của work template
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
},{
    timestamps: true
});

module.exports = WorkTemplate = mongoose.model("tasktemplates", TaskTemplateSchema);
