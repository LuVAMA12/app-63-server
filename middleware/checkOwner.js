import Admin from "../models/Admin.js"

const checkOwner = async (req, res, next ) => {
    try {
        if (!req.admin) {
            const admins = await Admin.findAll()
            if (admins.length === 0) {
                return (
                    req.first= 'owner',
                    next())
            }
        }
        else {
            const {role} = req.admin
            if ( role !== 'owner' )  return res.status(405).json('Access refused: owner only')
            }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
    }

export default checkOwner