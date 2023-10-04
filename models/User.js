const { Sequelize } = require("sequelize");
const { differenceInYears, parse } = require("date-fns");
const { sequelize } = require("../database/conexion");
const User = sequelize.define(
  "user",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "El nombre es obligatorio",
        },
        notEmpty: {
          msg: "El nombre no puede estar vacio",
        },
      },
    },
    apellidoPaterno: Sequelize.STRING,
    apellidoMaterno: Sequelize.STRING,
    fechaNacimiento: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        esMayorDeEdad(value) {
          const fechaFormateada = value.toISOString().split("T")[0];
          const fechaNacimiento = parse(
            fechaFormateada,
            "yyyy-MM-dd",
            new Date()
          );
          const edad = differenceInYears(new Date(), fechaNacimiento);
          // console.log(edad);
          if (edad < 18) {
            throw new Error("Debe ser mayor de edad");
          }
        },
      },
    },
    correoElectronico: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: "El correo ingresado ya existe",
      },
      validate: {
        notNull: {
          msg: "El correo electronico es obligatorio",
        },
        isEmail: {
          msg: "El correo electronico debe ser valido",
        },
      },
    },
    telefono: Sequelize.STRING,
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        esContraseniaSegura(value) {
          const longitudMinima = 8;
          const tieneMayusculas = /[A-Z]/.test(value);
          const tieneMinusculas = /[a-z]/.test(value);
          const tieneNumeros = /\d/.test(value);
          const tieneCaracterEspecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);
          if (
            value.length < longitudMinima ||
            !tieneMayusculas ||
            !tieneMinusculas ||
            !tieneNumeros||
            !tieneCaracterEspecial
          ) {
            throw new Error(
              "La contraseña no cumple con los requisitos de complejidad"
            );
          }
        },
      },
    },
  },
  {
    validate: {
      alMenosUnApellido() {
        if (!this.apellidoMaterno && !this.apellidoPaterno) {
          throw new Error("Debes proporcionar al menos un apellido");
        }
      },
    },
  }
);
module.exports = User;
