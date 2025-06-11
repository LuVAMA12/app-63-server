import { where } from 'sequelize'
import Admin from '../models/Admin.js'

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.findAll({
            exclude : {
                password
            }
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const getAdminByID = async (req, res) => {
    const {id} = req.admin
    try {
        const admin = await Admin.findOne({
            where: {
                id
            },
            exclude : {
                password
            }
        })
        if(!admin) return res.status(404).json('Admin not found ')
        return res.status(200).json(admin)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const updateAdminToOwnerByID = async (req, res) => {
    try {

    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

