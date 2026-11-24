// Produtos/index.js
import{ useState } from "react";
import InputGroup from "../../components/inputGroup";

const Produtos = () => {
    const [produto, setProduto] = useState({});
    const [lstProdutos, setLstProdutos] = useState([]);

    function validateProduto(produto) {
        if(!produto.nome) {
            alert("O Campo é Obrigatório");
            return;
        }

        if(!produto.preco) {
            alert("O Campo é Obrigatório");
            return;
        }
    }


    function handleChange (e) {
        setProduto({...Produtos, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault();
        setLstProdutos([...lstProdutos, produto]);
        setProduto({});
    }

    return(
        <div className="container">
            <h1 className="text-center fs-4">Produtos</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <InputGroup
                    label="Nome"
                    onChange={handleChange}
                    type="text"
                    placeholder="Nome do Produto"
                    name="Nome"/>
                    <InputGroup label="Preço"
                    onChange={handleChange}
                    type="number"
                    placeholder="Preço do Produto"
                    name="Preço"/>

                    <button className="btn btn-primary"
                    type="submit">Salvar</button>
                </form>
            </div>
            {}
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                    </tr>
                </thead>
                <tbody>
                    {lstProdutos.length === 0 ? (
                        <tr>
            <td colSpan={2} className="text-center">Nenhum produto cadastrado</td>
                        </tr>)
                        :(
                            lstProdutos.map((produto, index) => (
                                <tr key={index}>
                                    <tr>{produto.nome}</tr>
                                    <tr>R${produto.preco}</tr>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Produtos;