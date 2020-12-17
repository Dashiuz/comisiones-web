const Operators = require("../schemas/operatos");

const checkUser = async (operator) => {
  const chk = await Operators.findOne({ operator }).select("operator").exec();

  if (chk) {
    console.log("usuario existente");
    return true;
  } else {
    console.log("usuario nuevo... creando...");
    saveUser(operator);
  }
};

const saveUser = (operator) => {
  const obj = {
    operator,
  };

  const ope = new Operators(obj);

  ope
    .save()
    .then((result) => {
      console.log("RESULTADO: ", result);
    })
    .catch((ex) => {
      console.log("HANDLED_ERROR: ", ex);
    });
};

module.exports = {
  checkUser,
  saveUser,
};
