const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require('./User.model');

// Model quản lý dữ liệu lịch sử bấm giờ thực hiện công việc
const HistoryWorkingTimeSchema = new Schema({
    task: { //lưu id của công việc 
        type: Schema.Types.ObjectId,
        ref: Task,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    start: {
        type: Number,
        required: true
    },
    startTimer: {
        type: Number,
        required: true
    },
    stopTimer: {
        type: Number
    },
    time: {
        type: Number,
        default: 0
    },
    pause: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = HistoryWorkingTime = mongoose.model("history_working_times", HistoryWorkingTimeSchema);