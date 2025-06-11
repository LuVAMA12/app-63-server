import Admin from '../models/Admin.js'

const checkAdminOrOwner = async (req, res, next) => {
    const {id} = req.admin
    try {

        const admin = await Admin.findByPk(id, {attributes: { exclude: ['password'] }})

        if(!admin) return res.status(403).json(`Account not found`)
            
        const isOwner = admin.role === 'owner'
        const isAdmin = admin.role === 'admin'
        
        if (isOwner || isAdmin) {
            next()  
        }else {
            return res.status(403).json(`Access denied: you're not admin`)
           }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export default checkAdminOrOwner