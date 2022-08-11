const reportRouter = require('express').Router()
const { ReportController } = require('../controller')

reportRouter.get('/', ReportController.getAllReports)


module.exports = reportRouter