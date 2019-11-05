const RoleService = require('../services/Role.service');

exports.get = (req, res) => {
    return RoleService.get(req, res);
};

exports.getSuperRole = (req, res) => {
    return RoleService.getSuperRole(req, res);
};

exports.getRoleById = (req, res) => {
    return RoleService.getRoleById(req, res);
};

exports.getRoleOfUser = (req, res) => {
    return RoleService.getRoleOfUser(req, res);
};

exports.getRoleSameDepartment = (req, res) => {
    return RoleService.getRoleSameDepartment(req, res);
};

exports.getAdmins = (req, res) => {
    return RoleService.getAdmins(req, res);
};


exports.addAdmin = (req, res) => {
    return RoleService.addAdmin(req, res);
};
