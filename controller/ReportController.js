const { report, input, output, motorcycle, category } = require("../models");

class ReportController {
  static async getAllReports(req, res) {
    try {
      let getdata = await report.findAll({
        include: [{
          model: input,
          include: [{
            model: motorcycle, include:[category]
          }]
        },{
          model: output,
          include: [{
            model: motorcycle, include:[category]
          }]
        }],
        order: [["createdAt", "DESC"]],
      })
      res.render('./report', {reports: getdata})
      // res.json(getdata)
    } catch (error) {
      res.json(error)
    }
  }
  // static async getAllInputsReport(req,res){
  //   try {
  //     let getdata = await report.findAll({
  //       include: [{
  //         model: input,
  //         include: [{
  //           model: motorcycle, include:[category]
  //         }]
  //       }]
  //     })
  //     res.render('./report/coba.ejs', {reportinput: getdata})
  //     // res.json(data)
  //   } catch (error) {
  //     res.json(error)
  //   }
  // }
}

module.exports = ReportController;
