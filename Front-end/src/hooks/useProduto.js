import api from '../util/api';

function useProduto() {
  async function getAll() {
    const res = await api.get('/Produto/getAll');
    return res.data;
  }

  async function getById(id) {
    const res = await api.get(`/Produto/getById/${id}`);
    return res.data;
  }

  async function create(dadosForm) {
    const res = await api.post('/Produto/create', dadosForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }

  async function update(id, dadosForm) {
    const res = await api.patch(`/Produto/update/${id}`, dadosForm, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }

  async function remove(id) {
    const res = await api.delete(`/Produto/delete/${id}`);
    return res.data;
  }

  return { getAll, getById, create, update, remove };
}

export default useProduto;