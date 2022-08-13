const { category } = require("../models");

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      let get = await category.findAll({
        order: [["id", "ASC"]],
      });
      // console.log(typeof get)
      // res.json(get);
      res.render("./category", { categories: get });
    } catch (error) {
      res.json(error);
    }
  }
  static async addCategory(req, res) {
    try {
      const { name } = req.body;
      let add = await category.create({ name });
      res.json(add);
    } catch (error) {
      res.json(error);
    }
  }
  static async deleteCategory(req, res) {
    try {
      const id = +req.params.id;

      let deletedata = await category.destroy({
        where: { id: id },
      });
      deletedata === 1
        ? res.redirect("/categories")
        : res.json({ message: `id ${id} not found` });
    } catch (error) {
      res.json(error);
    }
  }
  static async updateCategory(req, res) {
    const id = +req.params.id;
    const { name } = req.body;
    let updatedata = await category.update(
      {
        name: name,
      },
      {
        where: { id: id },
      }
    );
    updatedata[0] === 1
      ? res.redirect('/categories')
      : res.json({ message: `error encountered with id ${id}` });
  }
  static async updateCategoryPage(req, res) {
    try {
      const id = +req.params.id;
      let datacate = await category.findOne({
        where: { id: id },
      });
      datacate.dataValues.id === id
        ? res.render("./category/updateCategory", { datacate })
        : res.json(`can't find id ${id}`);
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = CategoryController;
