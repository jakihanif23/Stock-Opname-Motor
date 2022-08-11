const motorcycleRouter = require('express').Router()
const { MotorcycleController } = require('../controller')

motorcycleRouter.get('/', MotorcycleController.getAllMotorcycles)

motorcycleRouter.get('/delete/:id', MotorcycleController.deleteMotorcycle)

motorcycleRouter.post('/add', MotorcycleController.addMotorcycle)

motorcycleRouter.post('/update/:id', MotorcycleController.updateMotorcycle)



module.exports = motorcycleRouter