const Produto = require('../model/Produto');

module.exports = class ProdutoController {
  static async create(req, res) {
    const { nome, preco } = req.body;
    const imagem = req.file ? req.file.filename : null;

    if (!nome) {
      return res.status(422).json({ message: 'Informe o nome do produto!' });
    }
    if (preco === undefined || preco === null || preco === '') {
      return res.status(422).json({ message: 'Informe o preço do produto!' });
    }
    if (Number(preco) < 0) {
      return res.status(422).json({ message: 'Valor inválido: o preço não pode ser menor que zero!' });
    }

    const novoProduto = new Produto({ nome, preco, imagem });

    try {
      const salvo = await novoProduto.save();
      res.status(201).json({ message: 'Produto cadastrado!', produto: salvo });
    } catch (err) {
      res.status(500).json({ message: 'Falha ao cadastrar produto: ' + err });
    }
  }

  static async getAll(req, res) {
    try {
      const lista = await Produto.findAll();
      res.status(200).json(lista);
    } catch (err) {
      res.status(500).json({ message: 'Falha ao listar produtos: ' + err });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    const item = await Produto.findByPk(id);
    if (!item) {
      return res.status(422).json({ message: 'Produto não localizado!' });
    }
    res.status(200).json(item);
  }

  static async update(req, res) {
    const { id } = req.params;
    const { nome, preco } = req.body;

    const item = await Produto.findByPk(id);
    if (!item) {
      return res.status(422).json({ message: 'Produto não localizado!' });
    }
    if (!nome) {
      return res.status(422).json({ message: 'Informe o nome do produto!' });
    }
    if (preco === undefined || preco === null || preco === '') {
      return res.status(422).json({ message: 'Informe o preço do produto!' });
    }
    if (Number(preco) < 0) {
      return res.status(422).json({ message: 'Valor inválido: o preço não pode ser menor que zero!' });
    }

    const atualizacao = {
      nome,
      preco,
      imagem: req.file ? req.file.filename : item.imagem
    };

    try {
      await item.update(atualizacao);
      res.status(200).json({ message: 'Produto alterado com sucesso!', produto: item });
    } catch (err) {
      res.status(500).json({ message: 'Falha ao alterar produto: ' + err });
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const item = await Produto.findByPk(id);
    if (!item) {
      return res.status(422).json({ message: 'Produto não localizado!' });
    }

    try {
      await item.destroy();
      res.status(200).json({ message: 'Produto removido com sucesso!' });
    } catch (err) {
      res.status(500).json({ message: 'Falha ao remover produto: ' + err });
    }
  }
};