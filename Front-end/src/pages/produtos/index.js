import { useState, useEffect, useRef } from "react";
import InputGroup from "../../components/inputGroup";
import useProduto from "../../hooks/useProduto";

const Produtos = () => {
  const { getAll, create, update, remove } = useProduto();
  const [formProduto, setFormProduto] = useState({ nome: "", preco: "" });
  const [arquivoImg, setArquivoImg] = useState(null);
  const [listaProdutos, setListaProdutos] = useState([]);
  const [idEdicao, setIdEdicao] = useState(null);
  const inputFileRef = useRef(null);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const retorno = await getAll();
      setListaProdutos(retorno);
    } catch (err) {
      alert("Falha ao buscar produtos.");
    }
  }

  function validarCampos() {
    if (!formProduto.nome || formProduto.nome.trim() === "") {
      alert("Preencha o nome do produto!");
      return false;
    }
    if (formProduto.preco === "" || formProduto.preco === null || formProduto.preco === undefined) {
      alert("Preencha o preço do produto!");
      return false;
    }
    if (Number(formProduto.preco) < 0) {
      alert("O preço não pode ser um valor negativo!");
      return false;
    }
    if (arquivoImg) {
      const mimes = ["image/jpeg", "image/png"];
      const nomeLower = arquivoImg.name.toLowerCase();
      const extValida = nomeLower.endsWith(".jpeg") || nomeLower.endsWith(".jpg") || nomeLower.endsWith(".png");
      if (!mimes.includes(arquivoImg.type) || !extValida) {
        alert("Selecione apenas uma imagem .jpeg ou .png!");
        return false;
      }
    }
    return true;
  }

  function handleChange(e) {
    setFormProduto({ ...formProduto, [e.target.name]: e.target.value });
  }

  function handleImagem(e) {
    const selecionado = e.target.files[0];
    if (!selecionado) {
      setArquivoImg(null);
      return;
    }
    const mimes = ["image/jpeg", "image/png"];
    const nomeLower = selecionado.name.toLowerCase();
    const extValida = nomeLower.endsWith(".jpeg") || nomeLower.endsWith(".jpg") || nomeLower.endsWith(".png");

    if (!mimes.includes(selecionado.type) || !extValida) {
      alert("Formato inválido! Aceitamos apenas .jpeg e .png.");
      e.target.value = "";
      setArquivoImg(null);
      return;
    }
    setArquivoImg(selecionado);
  }

  function resetarCampos() {
    setFormProduto({ nome: "", preco: "" });
    setArquivoImg(null);
    setIdEdicao(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validarCampos()) return;

    const dados = new FormData();
    dados.append("nome", formProduto.nome);
    dados.append("preco", formProduto.preco);
    if (arquivoImg) dados.append("imagem", arquivoImg);

    try {
      if (idEdicao) {
        await update(idEdicao, dados);
        alert("Produto atualizado!");
      } else {
        await create(dados);
        alert("Produto cadastrado!");
      }
      resetarCampos();
      buscarProdutos();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao gravar produto.");
    }
  }

  function prepararEdicao(prod) {
    setIdEdicao(prod.id);
    setFormProduto({ nome: prod.nome, preco: prod.preco });
    setArquivoImg(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  }

  async function excluirProduto(id) {
    if (!window.confirm("Confirmar exclusão do produto?")) return;
    try {
      await remove(id);
      alert("Produto removido!");
      buscarProdutos();
    } catch (err) {
      alert("Erro ao remover produto.");
    }
  }

  return (
    <div className="container">
      <h1 className="text-center fs-4 mb-4">
        {idEdicao ? "Alterar Produto" : "Novo Produto"}
      </h1>

      <form onSubmit={handleSubmit}>
        <InputGroup label="Nome" onChange={handleChange} type="text" placeholder="Digite o nome" name="nome" value={formProduto.nome} />
        <InputGroup label="Preço (R$)" onChange={handleChange} type="number" placeholder="0.00" name="preco" value={formProduto.preco} min="0" step="0.01" />

        <div className="input-group mb-3">
          <span className="input-group-text">Foto (.jpeg ou .png)</span>
          <input ref={inputFileRef} className="form-control" type="file" accept=".jpeg,.jpg,.png,image/jpeg,image/png" onChange={handleImagem} />
        </div>

        <button className="btn btn-success me-2" type="submit">{idEdicao ? "Salvar Alterações" : "Cadastrar"}</button>
        {idEdicao && (
          <button className="btn btn-outline-secondary" type="button" onClick={resetarCampos}>Cancelar</button>
        )}
      </form>

      <table className="table table-bordered table-hover align-middle mt-4">
        <thead className="table-light">
          <tr>
            <th>Foto</th>
            <th>Produto</th>
            <th>Valor</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {listaProdutos.length === 0 ? (
            <tr><td colSpan={4} className="text-center">Nenhum item registrado</td></tr>
          ) : (
            listaProdutos.map((prod) => (
              <tr key={prod.id}>
                <td>
                  {prod.imagem ? (
                    <img src={`http://localhost:5000/images/${prod.imagem}`} alt={prod.nome} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
                  ) : (
                    <span className="text-muted">Sem foto</span>
                  )}
                </td>
                <td>{prod.nome}</td>
                <td>R$ {Number(prod.preco).toFixed(2)}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm me-2" onClick={() => prepararEdicao(prod)}>Editar</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => excluirProduto(prod.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Produtos;