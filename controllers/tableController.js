import Table from "../models/Table.js"

export const getAllTables = async (req, res) => {
   try {
         const tables = await Table.findAll()
         if(tables.length < 1) return res.status(404).json('No table found yet')
         return res.status(200).json(tables)
     } catch (error) {
         console.log(error)
         return res.status(500).json('Internal server error')
     }
}

export const createTable =  async (req, res) => {
    const {numberPlaces, numberTable, location} = req.body
    try { 
        const newTable = await Table.create({
           numberPlaces,
           numberTable,
           location
        })
        if(!newTable) {
            return res.status(404).json('Table cannot be created')
        }
        return  res.status(201).json({message: 'Table has been created', newTable})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const deleteTableByID = async (req, res) => {
    const {id} = req.params
    try {
        const deleteTable = await Table.destroy({
            where: {
                id
            }
        })
        if(!deleteTable) return res.status(404).json('Table not found')
            return res.status(200).json('Table has been deleted')
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal server error')
    }
}

export const updateTableByID = async (req, res) => {
   const {id} = req.params
   const {numberPlaces, numberTable, location}= req.body
   try {

      const table = await Table.findOne({
         where : {
            id
         }
      })
      if(!table) return res.status(404).json(' Table not found')

       
      const updatedTable = await table.update({
        numberPlaces: numberPlaces || table.numberPlaces,
        numberTable: numberTable || table.numberTable,
        location: location || table.location
      })
      const saveTable = await table.save()
      
      return res.status(202).json(saveTable)
   } catch (error) {
      console.log(error)
      return res.status(500).json('Internal server error')
   }
 }
