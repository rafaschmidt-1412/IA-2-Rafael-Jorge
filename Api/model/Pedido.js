const { DataTypes } = require("sequelize");
const db = require('../db/conn.js');

const Pedido = db.define('Pedido', {
  valorTotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  itens: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Pedido;