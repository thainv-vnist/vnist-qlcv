const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require('./Role.model');

// Create Schema
const DepartmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    dean: {
        type: Schema.Types.ObjectId,
        ref: Role   
    },
    vice_dean: {
        type: Schema.Types.ObjectId,
        ref: Role 
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: Role 
    },parents: {
        type: Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true
});

module.exports = Department = mongoose.model("departments", DepartmentSchema);