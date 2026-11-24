const Produto = require('../model/Produto');

module.exports = class ProdutoController {
    static async create(req, res) {
        const {nome, preco} = req.body;

        if(!nome){
            res.status(422).json({ message: 'O nome é obrigatório!' });
            return;
        }

        if(!preco){
            res.status(422).json({ message: 'O preço é obrigatório!' });
            return;
        }
        const produto = new Produto({
            nome: nome,
            preco: preco
        });

        try {
            await produto.save();
            res.status(201).json({message: 'Produto criado com sucesso' });
        } catch (err) {
            res.status(500).json({message: 'Erro ao criar o produto: ' + err });
        }
    }    

    static async getAll(req, res) {
            try {
                const produtos = await Produto.findAll();
                res.status(200).json(produtos);
        }
        catch (err) {
                res.status(500).json({ message: 'Erro ao buscar os produtos:' +
                    err });
        }   
    }

    static async getById(req, res){
        const {id} = req.params;

        const produto = await Produto.findByPk(id);

        if (!produto) {
            res.status(422).json({message: 'Produto não encontrado!'});
            return;
        }

        res.status(200).json(produto);
    }

    static async update(req, res){
        const {id} = req.params;
        const {nome, preco} = req.body;

        const produto = await Produto.findByPl(id);
        if(!produto){
            res.status(422).json({message: "Produto não encontrado"});
            return;
        }
        try {
            await produto.update({nome, preco});
            req.status(200).json({message: 'Produto atualizado com sucesso'});
        } catch (err) {
            res.status(500).json({message: 'Erro ao atualizar o produto' + err});
        }
    }

    static async delete(req, res) {
        const {id} = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto){
            res.status(422).json({message: "Produto não encontrado"});
    }
     try {
            await produto.destroy();
            req.status(200).json({message: 'Produto deletado com sucesso!'});
        } catch (err) {
            res.status(500).json({message: 'Erro ao atualizar o produto' + err});
        }
    }
};