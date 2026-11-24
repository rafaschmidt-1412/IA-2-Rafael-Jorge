const { DataTypes } = require("sequelize");
const db = require('../db/conn.js');
const Produto = require('./Produto.js');

const ItemCarrinho = db.define('ItemCarrinho', {
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

ItemCarrinho.belongsTo(Produto, { foreignKey: 'produtoId', onDelete: 'CASCADE' });
Produto.hasMany(ItemCarrinho, { foreignKey: 'produtoId' });

module.exports = ItemCarrinho;