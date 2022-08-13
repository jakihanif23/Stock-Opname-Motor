const { json } = require("stream/consumers");
const { input, motorcycle, category, report } = require("../models");

class InputController {
  static async getAllInputs(req, res) {
    try {
      const id = +req.params.id;
      let get = await input.findAll({
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
      res.render('./input', {inputs: get})
    } catch (error) {
      res.json(error);
    }
  }
  static async addInputPage(req,res){
    try {
      const id = +req.params.id
      let datamotorcycle = await motorcycle.findByPk(id)
      // console.log(datamotorcycle)
      res.render('./input/addInput.ejs', {datamotorcycle})
    } catch (error) {
      res.json(error)
    }
  }
  static async addInput(req, res) {
    try {
      const id = +req.params.id
      const {
        stock,
        reportName,
      } = req.body;
      // console.log(req.body)

      let motor = await motorcycle.findByPk(id)
      console.log(motor.dataValues)

      let categoryId = motor.dataValues.categoryId
      let oldStock = motor.dataValues.stock;
      // console.log(categoryId)
      let add = await input.create({ motorcycleId: id, categoryId, stock });
      let inputId = add.dataValues.id;
      let outputId = null;
      let name = reportName;

      let addreport = await report.create({
        name,
        inputId,
        outputId,
        motorcycleId: id,
        categoryId,
      });

      // // update stock
      let updatemotor = await motorcycle.update(
        {
          stock: Number(oldStock) + Number(stock),
        },
        {
          where: { id: id },
        }
      );
      res.redirect('/inputs');
    } catch (error) {
      res.json(error);
    }
  }
  static async deleteInput(req, res) {
    try {
      const id = +req.params.id;
      const getinputstock = await input.findByPk(id);
      let getstock = getinputstock.dataValues.stock;
      // console.log(getstock)
      let motorid = getinputstock.dataValues.motorcycleId;
      let findOneMotorcycle = await motorcycle.findByPk(motorid);
      let oldStock = findOneMotorcycle.dataValues.stock;
      // console.log(oldStock)

      let deletereport = await report.destroy({
        where: { inputId: id },
      });
      let updatestockmotor = await motorcycle.update(
        {
          stock: Number(oldStock) - Number(getstock),
        },
        {
          where: { id: motorid },
        }
      );
      let deletedata = await input.destroy({
        where: { id: id },
      });
      deletedata === 1
        ? res.redirect('/inputs')
        : res.json({ message: `id ${id} not found` });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateInput(req, res) {
    const id = +req.params.id;
    const { motorcycleId, categoryId, stock } = req.body;

    //updating stock
    let cek = await input.findByPk(id);
    let stocklama = cek.dataValues.stock;
    console.log(`stock lama ${stocklama}`);

    let cek1 = await motorcycle.findByPk(motorcycleId);
    let stockmotorcycle = cek1.dataValues.stock;
    console.log(`stock dari motorcycle ${stockmotorcycle}`);

    let updatedata = await input.update(
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
  static async notused(req,res){
    try {
      const {
        motorcycleIdd,
        motorcycleName,
        categoryIdd,
        categoryName,
        transmisi,
        cc,
        price,
        stock,
        reportName,
      } = req.body;

      console.log(req.body)

      let [cate, catecreated] = await category.findOrCreate({
        where: { name: categoryName },
        defaults: {
          name: categoryName,
        },
      });
      let categoryId = cate.dataValues.id

      let [motor, motorcreated] = await motorcycle.findOrCreate({
        where: { name: motorcycleName },
        defaults: {
          name: motorcycleName,
          categoryId: categoryId,
          transmisi: transmisi,
          cc: cc,
          stock: 0,
          price: price,
        },
      });
      // //getting old stock
      let oldStock = motor.dataValues.stock;
      let motorcycleId = motor.dataValues.id;
      motorcreated === true ? categoryId = motor.dataValues.categoryId : categoryId

      console.log(categoryId)

      // let add = await input.create({ motorcycleId, categoryId, stock });
      // let inputId = add.dataValues.id;
      // let outputId = null;
      // let name = reportName;
      // // console.log(req.body);

      // let addreport = await report.create({
      //   name,
      //   inputId,
      //   outputId,
      //   motorcycleId,
      //   categoryId,
      // });

      // // update stock
      // let updatemotor = await motorcycle.update(
      //   {
      //     stock: Number(oldStock) + Number(stock),
      //   },
      //   {
      //     where: { id: motorcycleId },
      //   }
      // );
      // res.redirect('/inputs');
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = InputController;

// let [create, created] = await motorcycle.findOrCreate({
//   where: { id: motorcycleId },
//   defaults: {
//     name: motorcycleName
//   },
// });

// console.log(findOneMotorcycle.dataValues.stock)

// <menjumlahkan semua data input>
// let {count, rows} = await input.findAndCountAll({
//   where: {motorcycleId: motorcycleId}
// },
// )
// let arraykosong = []
// rows = rows.map(element=>{
//   // console.log(element.dataValues.stock)
//   arraykosong.push(element.dataValues.stock)
// })
// console.log(arraykosong)
