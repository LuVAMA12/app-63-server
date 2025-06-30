import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin from '../models/Admin.js'
const JWT_SECRET = process.env.JWT_SECRET

export const createAdmin = async (req, res) => {
    const firstAdmin = req.first
  // We destructured the req.body form
    const {firstName, lastName, email,password} = req.body
   try {
    // We check if email is already used in the db
    const admin = await Admin.findOne({
      where: {
        email
      }
    })
    if(admin) {
      return res.status(403).json('Email already taken')
    }

    // we hash the password before registering the admin in the db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newAdmin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: firstAdmin || 'admin'
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
  try {
    
    //We verify if the email already exist in the db and if it's admin or owner
    const admin = await Admin.findAll({where: { email }})
    if(admin.length < 1) return res.status(401).json(`Email or password invalid`)
    if (admin[0].role !== 'admin' && admin[0].role !== 'owner' ) return res.status(401).json(`Acces denied: admin only`)
      
      // We compare the password hash value in the req.body with the admin's password saved in the db
      const comparePassword = await bcrypt.compare(password, admin[0].password)
      if(!comparePassword)  return res.status(401).json(`Email or password invalid`)
      
      //if all checks are correct, we create a token to confirm the admin's connection
      const token = await jwt.sign({id : admin[0].id, role: admin[0].role}, JWT_SECRET, { expiresIn: '2h' })
    return res.status(200).json({message: `Welcome to ${admin[0].role}`, token})
    
  } catch (error) {
    console.log(error)
    return res.status(500).json('Internal server error')
  }
}