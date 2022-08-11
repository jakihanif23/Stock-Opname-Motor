const { input, motorcycle, category } = require("../models");

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
      res.json(get);
    } catch (error) {
      res.json(error);
    }
  }
  static async addInput(req, res) {
    try {
      const { motorcycleId, categoryId, stock } = req.body;
      let add = await input.create({ motorcycleId, categoryId, stock });

      //getting old stock
      let findOneMotorcycle = await motorcycle.findByPk(motorcycleId);
      let oldStock = findOneMotorcycle.dataValues.stock;


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

      // update stock
      let updatemotor = await motorcycle.update(
        {
          stock: Number(oldStock) + Number(stock),
        },
        {
          where: { id: motorcycleId },
        }
      );
      res.json(add);
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

      let deletedata = await input.destroy({
        where: { id: id },
      });
      let updatestockmotor = await motorcycle.update(
        {
          stock: Number(oldStock) - Number(getstock),
        },
        {
          where: { id: motorid },
        }
      );
      deletedata === 1
        ? res.json({ message: `success delete id ${id}` })
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
}

module.exports = InputController;
