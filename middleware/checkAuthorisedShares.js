import User from '../models/User.js'

export const checkAuthorisedDelete = async (req, res, next) => {
  const agentId = req.user.id
    const  agentRole = req.user.role
    const {id} = req.params
    try {
      // we check who is the agent and who is the subject
      const subject =  await User.findByPk(id, {  attributes: { exclude: ['password', "forgotten_password"] } })
      const owner = await User.findAll({
        where: {
          role : 'owner'
        }
      })
      if(!subject){
        return res.status(404).json(`Account not found`)
     }
      
       // If it's not the owner, it can't delete anything other than the users
       if (subject.role !== 'user' && agentRole !== 'owner' ) {
         return res.status(404).json('Permission denied: owner only ')
        }

        if (subject.role === 'owner' && agentRole === 'owner' && owner.length <= 1)  return res.status(404).json('Permission denied: At least one owner in the db is required')

      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
    }
}

export const checkAuthorisedUpdate = async (req, res, next) => {
  const agentId = req.user.id
    const  agentRole = req.user.role
    const {id} = req.params
    try {
      // we check who is the agent and who is the subject
      const subject =  await User.findByPk(id, {  attributes: { exclude: ['password', "forgotten_password"] } })

      if(!subject){
        return res.status(404).json(`Account not found`)
     }
     // if the account is the agent, we move on 
     if (agentId !== id ) {     
       // If it's not the owner, it can't delete anything other than the users
       if (subject.role !== 'user' && agentRole !== 'owner' ) {
         return res.status(404).json('Acces denied: owner only ')
        }
        
      }
      next()
    } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
    }
}

