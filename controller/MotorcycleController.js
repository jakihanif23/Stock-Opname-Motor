const { motorcycle, category, report, input, output } = require("../models");

class MotorcycleController {
  static async getAllMotorcycles(req, res) {
    try {
      let get = await motorcycle.findAll({
        include: [category],
        order: [["id", "ASC"]],
      });
      // console.log(get[0].dataValues.category)
      res.render("./motorcycle", { motorcycles: get });
      // res.json(get)
    } catch (error) {
      res.json(error);
    }
  }
  static async addMotorcycle(req, res) {
    try {
      const {
        motorcycleName,
        categoryIdd,
        categoryName,
        transmisi,
        cc,
        stock,
        price,
      } = req.body;
      // console.log(req.body)
      let datacreate = "";
      let name = categoryName;
      let categoryId = "";
      categoryIdd === "new cate"
        ? (datacreate = await category.create({ name }), categoryId = datacreate.id)
        : (categoryId = categoryIdd);
      console.log(categoryId)
      let addMotor = await motorcycle.create({
        name: motorcycleName,
        categoryId,
        transmisi,
        cc,
        stock,
        price,
      });

      // console.log(create.dataValues)
      // console.log(created)
      // console.log(findcategory.dataValues)
      res.redirect('/motorcycles')
    } catch (error) {
      res.json(error);
    }
  }
  static async addMotorcyclePage(req, res) {
    try {
      let datacate = await category.findAll();
      // console.log(datacate)
      res.render("./motorcycle/addMotorcycle.ejs", { datacate });
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
      updatemotor[0] === 1
        ? res.redirect('/motorcycles')
        : res.json({ message: `error encountered with id ${id}` });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateMotorcyclePage(req, res){
    try {
      const id = +req.params.id
      let datamotor = await motorcycle.findOne({
        where: {id: id},
        include: [category]
      })
      // console.log(datamotor.dataValues.category.dataValues)
      let datacate = await category.findAll()
      res.render('./motorcycle/updateMotorcycle.ejs', {datamotor, datacate})
    } catch (error) {
      res.json(error)
    }
  }
  static async getAllReports(req, res) {
    try {
      const id = +req.params.id;
      let getMotorcycle = await report.findAll({
        where: {
          motorcycleId: id,
        },
        include: [motorcycle],
      });
      let reports = await report.findAll({
        where: {
          motorcycleId: id,
        },
        include: [input, output],
      });
      // res.json(getOne)
      let result = {
        ...getMotorcycle[0].motorcycle.dataValues,
        reports,
      };

      // // console.log(result)
      getMotorcycle !== {} && reports !== {} && result !== {}
        ? res.json(result)
        : res.json(`can't find reports in id ${id}`);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = MotorcycleController;
