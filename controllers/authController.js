import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {

  // We destructured the req.body form
    const {firstName,lastName,email,phone, password} = req.body
   try {
    // We check if email is already used in the db
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user) {
      return res.status(403).json('Email already taken')
    }


    let hashedPassword = null
    
    if (password) {
      // we hash the password before registering the user in the db
      const salt = await bcrypt.genSalt(10)
      hashedPassword = await bcrypt.hash(password, salt)
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword
    })
   if(!newUser) {
    return res.status(404).json('User cannot be created')
   }
   return  res.status(201).json({message: 'User has been created'})
   } catch (error) {
    console.log(error)
    return res.status(500).json('Internal server error')
   }
 }

 export const createAdmin = async (req, res) => {

  // We destructured the req.body form
    const {firstName,lastName,email,phone,password} = req.body
   try {
    // We check if email is already used in the db
    const user = await User.findOne({
      where: {
        email
      }
    })
    if(user) {
      return res.status(403).json('Email already taken')
    }

    // we hash the password before registering the user in the db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newAdmin = await new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: 'admin'
    })
   if(!newAdmin) {
    return res.status(404).json('Admin cannot be created')
   }
   return  res.status(201).json({message: 'Admin has been created'})
   } catch (error) {
    console.log(error)
    return res.status(500).json('Internal server error')
   }
 }

export const loginAdmin = async (req, res) => {
  // We destructured the information from the req.body form 
  const {email, password} = req.body
  console.log(req.body)
  try {

    //We verify if the email already exist in the db and if it's admin or owner
    const user = await User.findAll({where: { email }})
    if(user.length < 1) return res.status(401).json(`Email or password invalid`)
    if (user[0].role === 'user') return res.status(401).json(`Acces denied: admin only`)
      
      // We compare the password hash value in the req.body with the user's password saved in the db
      const comparePassword = await bcrypt.compare(password, user[0].password)
      if(!comparePassword)  return res.status(401).json(`Email or password invalid`)
      
      //if all checks are correct, we create a token to confirm the user's connection
      const token = await jwt.sign({id : user[0].id, role: user[0].role}, JWT_SECRET)
    return res.status(200).json({message: `Welcome to ${user[0].firstName}`, token})
    
  } catch (error) {
    console.log(error)
    return res.status(500).json('Internal server error')
  }
}