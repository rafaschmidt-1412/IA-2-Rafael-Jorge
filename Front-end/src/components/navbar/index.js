//navbar/index.js

import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container'>
                <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                    <li className='nav-item'>
                        <Link className='nav-link text-light' to="\">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link text-light' to="\produtos">produtos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;