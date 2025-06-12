import { where } from 'sequelize'
import Admin from '../models/Admin.js'

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
           attributes: {  
                exclude : ['password', 'forgotten_password']
            }
        })    
        if(admins.length < 1) return res.status(404).json(`No Admin found yet`)
        return res.status(200).json(admins)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const getAdminByID = async (req, res) => {
    const {id} = req.admin
    try {
        const admin = await Admin.findByPk(id,{ attributes: {  exclude : ['password', 'forgotten_password'] }})
        if(!admin) return res.status(404).json('Admin not found ')
        return res.status(200).json(admin)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

 export const deleteAdminByID = async (req, res) => {
   const {id} = req.params
   try {
      // We delete Admin
        const deleteAdmin= await Admin.destroy({
         where : {
            id 
         }
      })
      if(!deleteAdmin){
         return res.status(404).json(`Account not found`)
      }
      return res.status(200).json(`Account has been deleted`)
      
   } catch (error) {
      console.log(error)
    return res.status(500).json('Internal server error')
   }
 }

export const updateRoleByID = async (req, res) => {
    const {id} = req.params
    try {
        const admin = await Admin.findByPk(id,{ attributes: {  exclude : ['password', 'forgotten_password'] }})

    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

