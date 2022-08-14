const motorcycleRouter = require('express').Router()
const { MotorcycleController } = require('../controller')

motorcycleRouter.get('/', MotorcycleController.getAllMotorcycles)

motorcycleRouter.get('/delete/:id', MotorcycleController.deleteMotorcycle)

motorcycleRouter.post('/add', MotorcycleController.addMotorcycle)
motorcycleRouter.get('/add', MotorcycleController.addMotorcyclePage)

motorcycleRouter.post('/update/:id', MotorcycleController.updateMotorcycle)
motorcycleRouter.get('/update/:id', MotorcycleController.updateMotorcyclePage)

motorcycleRouter.get('/:id/reports', MotorcycleController.getAllReports)



module.exports = motorcycleRouter