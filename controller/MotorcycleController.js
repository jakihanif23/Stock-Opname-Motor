const { motorcycle, category } = require("../models");

class MotorcycleController {
  static async getAllMotorcycles(req, res) {
    try {
      let get = await motorcycle.findAll({
        include: [category],
        order: [["id", "ASC"]],
      });
      res.json(get);
    } catch (error) {
      res.json(error);
    }
  }
  static async addMotorcycle(req, res) {
    try {
      const { name, categoryId, categoryName, transmisi, cc, stock, price } =
        req.body;
      let addMotor = await motorcycle.create({
        name,
        categoryId,
        transmisi,
        cc,
        stock,
        price,
      });

      let [create, created] = await category.findOrCreate({
        where: { id: categoryId },
        defaults: {
          name: categoryName,
        },
      });

      // console.log(create.dataValues)
      // console.log(created)
      // console.log(findcategory.dataValues)
      res.json(addMotor);
    } catch (error) {
      res.json(error);
    }
  }
  static async deleteMotorcycle(req, res) {
    try {
      const id = +req.params.id;

      let deleteData = await motorcycle.destroy({
        where: { id: id },
      });
      deleteData === 1
        ? res.json({ message: `delete id ${id} success` })
        : res.json({ message: `can't find id ${id}` });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateMotorcycle(req, res) {
    try {
      const id = +req.params.id;
      const { name, categoryId, transmisi, cc, stock, price } = req.body;

      let updatemotor = await motorcycle.update(
        {
          name: name,
          categoryId: categoryId,
          transmisi: transmisi,
          cc: cc,
          stock: stock,
          price: price,
        },
        {
          where: { id: id },
        }
      );
      console.log(updatemotor);
      // updatemotor[0] === 1
      //   ? res.json({ message: `data with id ${id} has been updated` })
      //   : res.json({ message: `error encountered with id ${id}` });
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = MotorcycleController;
