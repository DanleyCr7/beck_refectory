const repositories = require('../repositories/menu-repository');

exports.post = async (req, res) => {
  try {
    await repositories.create(req.body);
    res.status(200).send({
      message: 'success create menu',
    })
  } catch(err) {
    res.status(400).send({
      message: 'fudge!!',
      data: err,
    })
  }
};

exports.get = async (req, res) => {
  try {
    const data = await repositories.get();
    res.status(200).send(data);
  } catch(err) {
    res.status(400).send({
      message: 'fudge!!',
      data: err,
    });
  }
};

exports.getByDayAndMeal = async (req, res) => {
  try {
    const data = await repositories.getByDayAndMeal(req.params.day, req.params.meal);
    if(data.length == 0)
      throw 'Menu not found';
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({
      message: 'fudge!!',
      data: err,
    })
  }
};

exports.put = async (req, res) => {
  try {
    if(!(await repositories.updateMenu(req.params.day, req.params.meal, req.body)))
      throw 'Update fault';
    res.status(200).send({
      message: 'success update menu',
    });
  } catch(err) {
    res.status(400).send({
      message: 'fudge!!',
      data: err,
    })
  }
};

exports.delete = async (req, res) => {
  try {
    await repositories.remove(req.params.id);
    res.status(200).send({
      message: 'success delete menu',
    });
  } catch(err) {
    res.status(400).send({
      message: 'fudge!!',
      data: err,
    })
  }
};