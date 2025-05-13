import User from '../models/User.js'

const checkAdminOrOwner = async (req, res, next) => {
    const {id} = req.user
    try {

        const user = await User.findByPk(id, {attributes: { exclude: ['password'] }})

        if(!user) return res.status(403).json(`Account not found`)
            
        const isOwner = user.role === 'owner'
        const isAdmin = user.role === 'admin'
        
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