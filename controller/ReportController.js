const { report, input, output, motorcycle, category } = require("../models");

class ReportController {
  static async getAllReports(req, res) {
    try {
        let getdata = await report.findAll({
            include: [{
                model: input,
                include: [{
                    model: motorcycle,
                    include: [{model: category}]
                }]
            }]
        })
        res.json(getdata)
    } catch (error) {
        res.json(error)
    }
  }
}

module.exports = ReportController;
