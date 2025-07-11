import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    //  We find and return all users in our db
    const users = await User.findAll();
    if (!users) return res.status(404).json("Reservation not found");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    // We get user's informations by his id
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json(`User not found`);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error");
  }
};

export const createOrFindUser = async ({
  firstName,
  lastName,
  email,
  phone,
}) => {
  try {
    // We check if email is already used in the db
    let user = await User.findOne({
      where: {
        email,
      },
    });
    if (user) {
      return user.id;
    }
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
    });
    return newUser.id;
  } catch (error) {
    console.log(error);
  }
};

