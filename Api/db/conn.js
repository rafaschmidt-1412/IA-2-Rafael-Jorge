const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('loja', 'root', 'root',{
    host:'localhost',
    dialect: 'mariadb'
})

try {
    sequelize.authenticate();
    console.log('Conexão com o banco de dados realizada com sucesso!');
} catch (err) {
    console.log('Erro ao conectar com o banco de dados: ' + err);
}
module.exports = sequelize;