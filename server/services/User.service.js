const User = require('../models/User.model');
const Role = require('../models/Role.model');
const UserRole = require('../models/UserRole.model');
const bcrypt = require("bcryptjs");

exports.get = (req, res) => {
    User.find()
        // .sort({updatedAt: 'desc'})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(400).json({msg: err});
        })
    console.log("Get Users");
};

exports.getById = async (req, res) => {
    try {
        var result = await User.findById(req.params.id);
        
        userlogger.info(`User: ${req.params.id} Id: ${result.name} - Get user by id`);
        res.status(200).json(result);
    } catch (error) {
        userlogger.error('get all user error');
        res.status(400).json({msg: error});
    }
    console.log("Get Users By Id");
};

//lấy tất cả các user cùng phòng ban với user hiện tại
exports.getUsersSameDepartment = async(req, res) => {
    console.log("get user of department");
    try {
        const id_role = req.params.id; //lấy id role hiện tại của user
        var department = await Department.findOne({ 
            $or:[
                {'dean': id_role}, 
                {'vice_dean': id_role}, 
                {'employee': id_role}
            ]  
        });
        
        var dean = await UserRole.findOne({ id_role: department.dean}).populate('id_user id_role');
        var vice_dean = await UserRole.findOne({ id_role: department.vice_dean}).populate('id_user id_role');
        var employee = await UserRole.findOne({ id_role: department.employee}).populate('id_user id_role');
        var users = [];
        users = users.concat(dean, vice_dean, employee);

        res.status(200).json(users); //tra ve list cac user theo 3 chuc danh cua phong ban
    } catch (error) {
        res.status(400).json({msg: error});
    }
}
//lấy tất cả các user theo đơn vị
exports.getUsersOfDepartment = async(req, res) => {
    console.log("get user of department");
    try {
        var department = await Department.findById(req.params.id);
        var dean = await UserRole.findOne({ id_role: department.dean}).populate('id_user id_role');
        var vice_dean = await UserRole.findOne({ id_role: department.vice_dean}).populate('id_user id_role');
        var employee = await UserRole.findOne({ id_role: department.employee}).populate('id_user id_role');
        var users = [];
        users = users.concat(dean, vice_dean, employee);

        res.status(200).json(users); //tra ve list cac user theo 3 chuc danh cua phong ban
    } catch (error) {
        res.status(400).json({msg: error});
    }
}

exports.create = async (req, res) => {
    try {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, async(err, hash) => {
                if (err) throw err;
                var user = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hash
                };
                var user = await User.create(user);

                res.status(200).json({
                    msg: "Create user successfully",
                    user: user
                });
            });
        });
    } catch (error) {
        res.status(400).json({msg: "Canot create user! Try again"});
    }
    console.log("Create User");
};

exports.createRole = async (req, res) => {
    try {
        await UserRole.create({
            id_user: req.body.id_user,
            id_role: req.body.id_role
        });

        res.status(200).json("Add role successfully!");
    } catch (error) {
        res.status(400).json({msg: error});
    }
};

exports.edit = async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.params.id }, //tìm user theo id
            { $set:{ name: req.body.name } } //update thông tin user
        );

        res.status(200).json("Edit user successfully");
    } catch (error) {
        res.status(400).json({msg: error});
    }
};

exports.editRole = async (req, res) => {
    try {
        //code here  ...
    } catch (error) {
        res.json({ message: error });
    }
};

exports.delete = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        await UserRole.deleteOne({ id_user: req.params.id });
        res.status(200).json({ msg: "Delete user successfully!" });
    } catch (error) {
        res.status(400).json({msg: error});
    }
    console.log("DELETE USER")
};