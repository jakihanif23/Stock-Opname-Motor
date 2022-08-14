const { output, motorcycle, category, report } = require("../models");

class OutputController {
  static async getAllOutputs(req, res) {
    try {
      const id = +req.params.id;
      let get = await output.findAll({
        include: [
          {
            model: motorcycle,
            include: [{ model: category }],
          },
        ],
        order: [["id", "ASC"]],
      });

      // console.log(typeof get)
      // res.json(get);
      res.render("./output", { outputs: get });
    } catch (error) {
      res.json(error);
    }
  }
  static async addOutputPage(req, res) {
    try {
      const id = +req.params.id;
      let datamotorcycle = await motorcycle.findByPk(id);
      // console.log(datamotorcycle)
      res.render("./output/addOutput.ejs", { datamotorcycle });
    } catch (error) {
      res.json(error);
    }
  }
  static async addOutput(req, res) {
    try {
      const id = +req.params.id;
      const {
        stock,
        reportName,
      } = req.body;

      // console.log(req.body)

      let motor = await motorcycle.findByPk(id)
      // console.log(motor.dataValues)

      let categoryId = motor.dataValues.categoryId
      let oldStock = motor.dataValues.stock;
      console.log(categoryId)

      let add = await output.create({ motorcycleId: id, categoryId, stock });
      let outputId = add.dataValues.id;
      let inputId = null;
      let name = reportName;
      // console.log(req.body);

      let addreport = await report.create({
        name,
        inputId,
        outputId,
        motorcycleId: id,
        categoryId,
      });

      // update stock
      let updatemotor = await motorcycle.update(
        {
          stock: Number(oldStock) - Number(stock),
        },
        {
          where: { id: id },
        }
      );
      res.redirect('/outputs')
    } catch (error) {
      res.json(error);
    }
  }
  static async deleteOutput(req, res) {
    try {
      const id = +req.params.id;
      const getoutputstock = await output.findByPk(id);
      let getstock = getoutputstock.dataValues.stock;
      // console.log(getstock)
      let motorid = getoutputstock.dataValues.motorcycleId;
      let findOneMotorcycle = await motorcycle.findByPk(motorid);
      let oldStock = findOneMotorcycle.dataValues.stock;
      // console.log(oldStock)

      let deletedata = await output.destroy({
        where: { id: id },
      });
      let deletereport = await report.destroy({
        where: { outputId: id },
      });
      let updatestockmotor = await motorcycle.update(
        {
          stock: Number(oldStock) + Number(getstock),
        },
        {
          where: { id: motorid },
        }
      );
      deletedata === 1
        ? res.redirect('/outputs')
        : res.json({ message: `id ${id} not found` });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateOutput(req, res) {
    const id = +req.params.id;
    const { motorcycleId, categoryId, stock } = req.body;

    //updating stock
    let cek = await output.findByPk(id);
    let stocklama = cek.dataValues.stock;
    console.log(`stock lama ${stocklama}`);

    let cek1 = await motorcycle.findByPk(motorcycleId);
    let stockmotorcycle = cek1.dataValues.stock;
    console.log(`stock dari motorcycle ${stockmotorcycle}`);

    let updatedata = await output.update(
      {
        motorcycleId: motorcycleId,
        categoryId: categoryId,
        stock: stock,
      },
      {
        where: { id: id },
      }
    );
    let updateStock = await motorcycle.update(
      {
        stock: Number(stockmotorcycle) - Number(stocklama) + Number(stock),
      },
      {
        where: { id: motorcycleId },
      }
    );
    updatedata[0] === 1
      ? res.json({ message: `data with id ${id} has been updated` })
      : res.json({ message: `error encountered with id ${id}` });
  }
}

module.exports = OutputController;

// console.log(findOneMotorcycle.dataValues.stock)

// <menjumlahkan semua data output>
// let {count, rows} = await output.findAndCountAll({
//   where: {motorcycleId: motorcycleId}
// },
// )
// let arraykosong = []
// rows = rows.map(element=>{
//   // console.log(element.dataValues.stock)
//   arraykosong.push(element.dataValues.stock)
// })
// console.log(arraykosong)
