const checkOwner = (req, res, next ) => {
    const {role} = req.user
    console.log(role)
try {
    if (role !== 'owner' )  return res.status(405).json('Access refused: owner only')
    next()
} catch (error) {
    console.log(error)
    return res.status(500).json('Internal server error')
}
}

export default checkOwner