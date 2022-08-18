const { errors, successMessageTypes } = require('../../constants');
const { Admin, Role } = require('../../models');
const formatResponse = require('../../utils/format-response');
const { successMessages } = require('../../utils/messages-generate');

const AdminRegister = async (req, res, next) => {
  const newAdmin = {
    email: req.body.email,
    fullname: req.body.fullname,
    password: req.body.password,
    phone_number: req.body.phone_number,
    roleId: req.body.roleId,
  };

  if (!newAdmin.email) {
    return next({ name: errors['400_EMPTY_EMAIL'] });
  }
  if (!newAdmin.password) {
    return next({ name: errors['400_EMPTY_PASSWORD'] });
  }
  if (!newAdmin.phone_number) {
    return next({ name: errors['400_EMPTY_PHONE_NUMBER'] });
  }
  if (!newAdmin.fullname) {
    return next({ name: errors['400_EMPTY_FULL_NAME'] });
  }
  if (!newAdmin.roleId) {
    return next({ name: errors['400_EMPTY_FIELD'], description: 'Admin role' });
  }

  try {
    const role = await FindRole({ id: newAdmin.roleId });
    if (!role?.data)
      return next({ name: errors['400_NOT_EXIST'], description: 'Role ID' });

    let createUser = null;
    const findEmail = await FindAdmin({ email: newAdmin.email });
    const findPhoneNumber = await FindAdmin({
      phone_number: newAdmin.phone_number,
    });
    if (findEmail && !findPhoneNumber) {
      await UpdateAdmin(
        { id: findEmail.id },
        { phone_number: newAdmin.phone_number }
      );
    } else if (!findEmail && findPhoneNumber) {
      return next({ name: errors['400_EXIST_PHONE_NUMBER'] });
    } else if (findEmail && findPhoneNumber) {
      if (findEmail.id !== findPhoneNumber.id) {
        return next({ name: errors['400_EXIST_EMAIL'] });
      }
    } else if (!findEmail && !findPhoneNumber) {
      createUser = await Admin.create(newAdmin);
      if (!createUser) return next(createUser);
    }
    return res.status(200).json(
      formatResponse(
        true,
        200,
        successMessages(successMessageTypes.createData, 'Admin'),
        {
          email: newAdmin.email,
          fullname: newAdmin.fullname,
          phoneNumber: newAdmin.phone_number,
        }
      )
    );
  } catch (error) {
    return next(error);
  }
};

const FindAdmin = async (payload) => {
  try {
    const user = await Admin.findOne({
      where: { ...payload, isActive: false },
    });
    return user || null;
  } catch (error) {
    return error;
  }
};

const UpdateAdmin = async (opt, payload) => {
  try {
    const update = await Admin.update(payload, { where: opt });
    return update || null;
  } catch (error) {
    return error;
  }
};

const FindRole = async (opt) => {
  try {
    const role = await Role.findOne({ where: opt });
    return { data: role, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

module.exports = { AdminRegister };
