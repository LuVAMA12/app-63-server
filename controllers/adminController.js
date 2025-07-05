import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: {
        exclude: ["password", "forgotten_password"],
      },
    });
    if (!admins) return res.status(404).json("Admin not found");

    return res.status(200).json(admins);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getAdminByID = async (req, res) => {
  const { id } = req.admin;
  try {
    const admin = await Admin.findByPk(id, {
      attributes: { exclude: ["password", "forgotten_password"] },
    });
    if (!admin) return res.status(404).json("Admin not found ");
    return res.status(200).json(admin);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const deleteAdminByID = async (req, res) => {
  const { id } = req.params;
  try {
    // We delete Admin
    const deleteAdmin = await Admin.destroy({
      where: {
        id,
      },
    });
    if (!deleteAdmin) {
      return res.status(404).json(`Account not found`);
    }
    return res.status(200).json(`Account has been deleted`);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateRoleByID = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json(" Admin not found");

    const adminUpdate = await admin.update({
      role: role ?? admin.role,
    });

    const updatedAdmin = await Admin.findByPk(id, {
      attributes: { exclude: ["password", "forgotten_password"] },
    });
    return res.status(202).json({ message: "Admin has been updated" }, updatedAdmin);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const updateAdminByID = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password } = req.body;
  try {
    const admin = await Admin.findByPk(id);
    if (!admin) return res.status(404).json(" Admin not found");

    let hashedPassword;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    const adminUpdate = await admin.update({
      firstName: firstName ?? admin.firstName,
      lastName: lastName ?? admin.lastName,
      email: email ?? admin.email,
      password: hashedPassword,
    });

    const updatedAdmin = await Admin.findOne({
      where: { id },
      attributes: { exclude: ["password", "forgotten_password"] },
    });
    return res.status(202).json({ message: "Admin has been updated" }, updatedAdmin);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};
