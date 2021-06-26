const mongoose = require('mongoose');
const Student = mongoose.model('Student');

exports.checkMatricula = async (data) => {
  const { matricula } = data;
  return await Student.findOne({ matricula });
};

exports.create = async (data) => {
  return await Student.create(data);
};

exports.get = async () => {
  const data = await Student.find({}).sort({ matricula: 1 });
  return data;
};

exports.getByMatricula = async (matricula) => {
  const data = await Student.findOne({ matricula });
  return data;
};

exports.getById = async (id) => {
  const data = await Student.findById(id);
  return data;
};

exports.getByRequiredMeal = async () => {
  const data = await Student.find({ requiredMeal: true }).sort({ matricula: 1 });
  // data.length number of students that will to eat
  return data; 
};

exports.getByCanRequiredMeal = async () => {
  const data = await Student.find({ canRequiredMeal: true }).sort({ matricula: 1 });
  // data.length number of students that will to eat
  return data; 
};

exports.getByCannotRequiredMeal = async () => {
  const data = await Student.find({ canRequiredMeal: false }).sort({ matricula: 1 });
  // data.length number of students that will to eat
  return data; 
};

exports.update = async (id, data) => {
  await Student.findByIdAndUpdate(id, {
    $set: {
      name: data.name,
      cpf: data.cpf,
      matricula: data.matricula,
      requiredMeal: data.requiredMeal,
    }
  });
};

exports.updateRequiredMeal = async (id) => {
  const data = await Student.findById(id);
  return await Student.findOneAndUpdate({ _id: id, canRequiredMeal: true }, {
    $set: {
      requiredMeal: !data.requiredMeal,
    }
  });
};

exports.updateCanRequiredMeal = async (id) => {
  const data = await Student.findById(id);
  await Student.findOneAndUpdate({ _id: id }, {
    $set: {
      canRequiredMeal: !data.canRequiredMeal,
    }
  });
};

exports.removeById = async (id) => {
  await Student.findOneAndDelete({ _id: id });
};
