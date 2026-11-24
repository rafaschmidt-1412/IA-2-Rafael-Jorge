const ItemCarrinho = require('../model/ItemCarrinho');
const Produto = require('../model/Produto');

module.exports = class ItemCarrinhoController {
  static async adicionar(req, res) {
    const { produtoId, quantidade = 1 } = req.body;
    if (!produtoId) {
      return res.status(422).json({ message: 'Selecione um produto!' });
    }

    try {
      const prod = await Produto.findByPk(produtoId);
      if (!prod) {
        return res.status(404).json({ message: 'Produto não encontrado!' });
      }

      let registro = await ItemCarrinho.findOne({ where: { produtoId } });
      if (registro) {
        registro.quantidade += Number(quantidade);
        await registro.save();
        return res.status(200).json({ message: 'Quantidade atualizada no carrinho!', item: registro });
      }

      const criado = await ItemCarrinho.create({ produtoId, quantidade: Number(quantidade) });
      res.status(201).json({ message: 'Item inserido no carrinho!', item: criado });
    } catch (err) {
      res.status(500).json({ message: 'Erro no carrinho: ' + err });
    }
  }

  static async listar(req, res) {
    try {
      const lista = await ItemCarrinho.findAll({ include: [Produto] });
      res.status(200).json(lista);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao carregar carrinho: ' + err });
    }
  }

  static async alterarQtd(req, res) {
    const { id } = req.params;
    const { quantidade } = req.body;

    try {
      const registro = await ItemCarrinho.findByPk(id);
      if (!registro) {
        return res.status(404).json({ message: 'Item não está no carrinho!' });
      }

      if (Number(quantidade) <= 0) {
        await registro.destroy();
        return res.status(200).json({ message: 'Item excluído do carrinho!' });
      }

      registro.quantidade = Number(quantidade);
      await registro.save();
      res.status(200).json({ message: 'Quantidade alterada!', item: registro });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao alterar quantidade: ' + err });
    }
  }

  static async excluir(req, res) {
    const { id } = req.params;
    try {
      const registro = await ItemCarrinho.findByPk(id);
      if (!registro) {
        return res.status(404).json({ message: 'Item não está no carrinho!' });
      }
      await registro.destroy();
      res.status(200).json({ message: 'Item excluído do carrinho!' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir item: ' + err });
    }
  }

  static async limpar(req, res) {
    try {
      await ItemCarrinho.destroy({ where: {} });
      res.status(200).json({ message: 'Carrinho limpo!' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao limpar carrinho: ' + err });
    }
  }
};