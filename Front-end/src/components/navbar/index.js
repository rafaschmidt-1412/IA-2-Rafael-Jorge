import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/home">E-Commerce</Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/home">Vitrine / Vendas</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/produtos">Gerenciar Produtos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;