const { DataTypes } = require("sequelize");
const db = require('../db/conn.js');

const Produto = db.define('Produto',{
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

module.exports = Produto;