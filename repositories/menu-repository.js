const mongoose = require('mongoose');
const Menu = mongoose.model('Menu');

exports.create = async (data) => {
  await Menu.create(data);
};

exports.get = async () => {
  const data = await Menu.find({}).sort({ day: 1, meal: 1 });
  return data;
};

exports.getByDayAndMeal = async (day, meal) => {
  const data = await Menu.find({ day, meal }).sort({ day: 1, meal: 1 });
  return data;
};

exports.updateMenu = async (day, meal, data) => {
  return await Menu.findOneAndUpdate({ day, meal }, {
    $set: {
      title: data.title,
      description: data.description,
      day: day,
      meal: meal,
    }
  });
};

exports.remove = async (id) => {
  await Menu.findOneAndDelete({ _id: id});
};