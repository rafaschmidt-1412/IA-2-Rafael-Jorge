import api from '../util/api';

function useProduto(){
    async function getAll() {
        const response = await api.get('/prodtuo/getAll');
        return response.data;
    }
    async function getById(id) {}
    async function create(produto){
        const response = await api.post('/produto/create', produto);
        return response.data;
    }
    async function update(id, produto){}
    async function remove(id){}

    return {getAll, getById, create, update, remove, };
}

export default useProduto;