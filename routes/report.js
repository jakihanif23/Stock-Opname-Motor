const reportRouter = require('express').Router()
const { ReportController } = require('../controller')

reportRouter.get('/', ReportController.getAllReports)
// reportRouter.get('/inputs', ReportController.getAllInputsReport)
// reportRouter.get('/outputs', ReportController.getAllOutputsReport)


module.exports = reportRouter