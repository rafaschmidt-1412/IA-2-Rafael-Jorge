import { useState, useEffect } from "react";
import useProduto from "../../hooks/useProduto";
import useLoja from "../../hooks/useLoja";

const Home = () => {
  const { getAll: buscarProdutos } = useProduto();
  const {
    listarCarrinho,
    adicionarProduto,
    mudarQuantidade,
    removerDoCarrinho,
    fecharPedido,
    listarPedidos
  } = useLoja();

  const [catalogo, setCatalogo] = useState([]);
  const [itensCarrinho, setItensCarrinho] = useState([]);
  const [historicoPedidos, setHistoricoPedidos] = useState([]);

  useEffect(() => {
    atualizarTela();
  }, []);

  async function atualizarTela() {
    try {
      const [prods, carr, peds] = await Promise.all([
        buscarProdutos(),
        listarCarrinho(),
        listarPedidos()
      ]);
      setCatalogo(prods);
      setItensCarrinho(carr);
      setHistoricoPedidos(peds);
    } catch (err) {
      console.error("Erro ao carregar informações:", err);
    }
  }

  async function handleComprar(idProduto) {
    try {
      await adicionarProduto(idProduto, 1);
      setItensCarrinho(await listarCarrinho());
    } catch (err) {
      alert("Não foi possível adicionar ao carrinho.");
    }
  }

  async function handleQtd(idItem, qtd) {
    try {
      await mudarQuantidade(idItem, qtd);
      setItensCarrinho(await listarCarrinho());
    } catch (err) {
      alert("Erro ao mudar quantidade.");
    }
  }

  async function handleExcluir(idItem) {
    try {
      await removerDoCarrinho(idItem);
      setItensCarrinho(await listarCarrinho());
    } catch (err) {
      alert("Erro ao remover do carrinho.");
    }
  }

  async function handleConcluirCompra() {
    if (itensCarrinho.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    try {
      const res = await fecharPedido();
      alert(`${res.message} Valor total: R$ ${Number(res.venda.valorTotal).toFixed(2)}`);
      atualizarTela();
    } catch (err) {
      alert(err.response?.data?.message || "Erro ao concluir a venda.");
    }
  }

  const somaTotal = itensCarrinho.reduce((soma, item) => {
    const valor = item.Produto ? Number(item.Produto.preco) : 0;
    return soma + valor * item.quantidade;
  }, 0);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <h2 className="fs-4 mb-3">Produtos Disponíveis</h2>
          <div className="row">
            {catalogo.length === 0 ? (
              <p className="text-muted">Nenhum produto cadastrado no momento.</p>
            ) : (
              catalogo.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card h-100">
                    {item.imagem ? (
                      <img src={`http://localhost:5000/images/${item.imagem}`} className="card-img-top" alt={item.nome} style={{ height: "180px", objectFit: "cover" }} />
                    ) : (
                      <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ height: "180px" }}>Sem imagem</div>
                    )}
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title">{item.nome}</h5>
                        <p className="card-text fw-bold text-primary">R$ {Number(item.preco).toFixed(2)}</p>
                      </div>
                      <button className="btn btn-outline-primary w-100 mt-2" onClick={() => handleComprar(item.id)}>
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Meu Carrinho</h5>
            </div>
            <div className="card-body">
              {itensCarrinho.length === 0 ? (
                <p className="text-muted text-center my-3">Nenhum item adicionado.</p>
              ) : (
                <>
                  <ul className="list-group mb-3">
                    {itensCarrinho.map((item) => (
                      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{item.Produto?.nome}</strong>
                          <br />
                          <small className="text-muted">R$ {Number(item.Produto?.preco || 0).toFixed(2)} x {item.quantidade}</small>
                        </div>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-outline-secondary" onClick={() => handleQtd(item.id, item.quantidade - 1)}>-</button>
                          <button className="btn btn-outline-secondary" onClick={() => handleQtd(item.id, item.quantidade + 1)}>+</button>
                          <button className="btn btn-outline-danger" onClick={() => handleExcluir(item.id)}>x</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
                    <span>Total:</span>
                    <span>R$ {somaTotal.toFixed(2)}</span>
                  </div>
                  <button className="btn btn-success w-100" onClick={handleConcluirCompra}>Finalizar Compra</button>
                </>
              )}
            </div>
          </div>

          {historicoPedidos.length > 0 && (
            <div className="card mt-4">
              <div className="card-header bg-light fw-bold">
                Pedidos Concluídos
              </div>
              <ul className="list-group list-group-flush">
                {historicoPedidos.slice(0, 5).map((ped) => (
                  <li key={ped.id} className="list-group-item d-flex justify-content-between">
                    <span>Pedido #{ped.id}</span>
                    <strong>R$ {Number(ped.valorTotal).toFixed(2)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;