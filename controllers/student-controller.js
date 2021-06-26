const repository = require('../repositories/student-repository');

exports.register = async (req, res) => {
  try {
    if(await repository.checkMatricula(req.body))
      return res.status(401).send({
        error: 'user already exits'
      });
    
    const student = await repository.create(req.body);
    
    return res.status(200).send({
      message: 'success registred student!',
      student,
      token: student.generateToken()
    });
  } catch(err) {
    return res.status(400).send({
      error: 'user registration failed!!',
      data: err
    });
  }
};

exports.get = async (req, res) => {
  try {
    const data = await repository.get();
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    });
  }
};

exports.getByMatricula = async (req, res) => {
  try {
    const data = await repository.getByMatricula(req.params.matricula);
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await repository.getById(req.params.id);
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.getByRequiredMeal = async (req, res) => {
  try {
    const data = await repository.getByRequiredMeal();
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.getByCanRequiredMeal = async (req, res) => {
  try {
    const data = await repository.getByCanRequiredMeal();
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.getByCannotRequiredMeal = async (req, res) => {
  try {
    const data = await repository.getByCannotRequiredMeal();
    return res.status(200).send(data);
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.put = async (req, res) => {
  try {
    await repository.update(req.params.id, req.body);
    return res.status(200).send({
      message: 'succes update student'
    });
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.putRequiredMeal = async (req, res) => {
  try {
    if(!(await repository.updateRequiredMeal(req.params.id, req.body))) {
      throw 'student dont register to required meal';
    }

    return res.status(200).send({
      message: 'success update required-meal'
    });
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.putCanRequiredMeal = async (req, res) => {
  try {
    await repository.updateCanRequiredMeal(req.params.id)

    return res.status(200).send({
      message: 'success update required-meal'
    });
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.delete = async (req, res) => {
  try {
    await repository.removeById(req.params.id);
    return res.status(200).send({
      message: 'success delete student'
    });
  } catch(err) {
    return res.status(400).send({
      error: 'fudge!!',
      data: err
    })
  }
};

exports.auth = async (req, res) => {
  try {
    const { matricula, password } = req.body;

    const student = await repository.getByMatricula(matricula);
    console.log(student);
    console.log('pass');
    console.log(password);

    if(!student) {
      return res.status(404).send({ error: 'user not found' });
    }

    // BUG!!!!!
    const compHash = student.compareHash(password);
    console.log('veirfy');
    console.log(compHash); // promisse [pending]

    if (!(compHash)) {
      return res.status(400).send({ error: 'invalid password' });
    }

    return res.send({
      message: 'student logged',
      student,
      token: student.generateToken()
    });
  } catch(err) {
    return res.status(400).student({ error: 'user authentication failed' });
  }
};
