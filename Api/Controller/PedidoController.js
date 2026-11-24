const Pedido = require('../model/Pedido');
const ItemCarrinho = require('../model/ItemCarrinho');
const Produto = require('../model/Produto');

module.exports = class PedidoController {
  static async concluir(req, res) {
    try {
      const itens = await ItemCarrinho.findAll({ include: [Produto] });
      if (!itens || itens.length === 0) {
        return res.status(422).json({ message: 'Nenhum item no carrinho para fechar pedido!' });
      }

      let total = 0;
      const detalhes = itens.map((el) => {
        const sub = Number(el.Produto.preco) * el.quantidade;
        total += sub;
        return {
          produtoId: el.produtoId,
          nome: el.Produto.nome,
          precoUnitario: Number(el.Produto.preco),
          quantidade: el.quantidade,
          subtotal: sub
        };
      });

      const pedidoSalvo = await Pedido.create({
        valorTotal: total,
        itens: JSON.stringify(detalhes)
      });

      await ItemCarrinho.destroy({ where: {} });

      res.status(201).json({ message: 'Pedido finalizado com sucesso!', venda: pedidoSalvo });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao concluir pedido: ' + err });
    }
  }

  static async listar(req, res) {
    try {
      const historico = await Pedido.findAll({ order: [['createdAt', 'DESC']] });
      res.status(200).json(historico);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao listar pedidos: ' + err });
    }
  }
};