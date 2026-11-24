import api from '../util/api';

function useLoja() {
  async function listarCarrinho() {
    const res = await api.get('/Carrinho/getAll');
    return res.data;
  }

  async function adicionarProduto(produtoId, quantidade = 1) {
    const res = await api.post('/Carrinho/add', { produtoId, quantidade });
    return res.data;
  }

  async function mudarQuantidade(id, quantidade) {
    const res = await api.patch(`/Carrinho/update/${id}`, { quantidade });
    return res.data;
  }

  async function removerDoCarrinho(id) {
    const res = await api.delete(`/Carrinho/delete/${id}`);
    return res.data;
  }

  async function fecharPedido() {
    const res = await api.post('/Venda/finalizar');
    return res.data;
  }

  async function listarPedidos() {
    const res = await api.get('/Venda/getAll');
    return res.data;
  }

  return {
    listarCarrinho,
    adicionarProduto,
    mudarQuantidade,
    removerDoCarrinho,
    fecharPedido,
    listarPedidos
  };
}

export default useLoja;