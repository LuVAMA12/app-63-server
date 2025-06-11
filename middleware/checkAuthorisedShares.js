import Admin from '../models/Admin.js'

export const checkAuthorisedDelete = async (req, res, next) => {
  const agentId = req.admin.id
    const  agentRole = req.admin.role
    const {id} = req.params
    try {
      // we check who is the agent and who is the subject
      const subject =  await Admin.findByPk(id, {  attributes: { exclude: ['password', "forgotten_password"] } })
      const owner = await Admin.findAll({
        where: {
          role : 'owner'
        }
      })
      if(!subject){
        return res.status(404).json(`Account not found`)
     }
      
       // If it's not the owner, it can't delete anything other than the admins
       if (subject.role !== 'admin' && agentRole !== 'owner' ) {
         return res.status(404).json('Permission denied: admin only ')
        }

        if (subject.role === 'owner' && agentRole === 'owner' && owner.length <= 1)  return res.status(404).json('Permission denied: At least one owner in the db is required')

      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
    }
}

export const checkAuthorisedUpdate = async (req, res, next) => {
  const agentId = req.admin.id
    const  agentRole = req.admin.role
    const {id} = req.params
    try {
      // we check who is the agent and who is the subject
      const subject =  await Admin.findByPk(id, {  attributes: { exclude: ['password', "forgotten_password"] } })

      if(!subject){
        return res.status(404).json(`Account not found`)
     }
     // if the account is the agent, we move on 
     if (agentId !== id ) {     
       // If it's not the owner, it can't delete anything other than the admins
       if (subject.role !== 'admin' && agentRole !== 'owner' ) {
         return res.status(404).json('Acces denied: admin only ')
        }
        
      }
      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
    }
}

