import {NavLink} from 'react-router-dom';

const Toolbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid container">
        <NavLink to='/' className='navbar-brand'>Quotes Central</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to='/' className='nav-link'>Quotes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to='/add-quote' className='nav-link'>Submit new quote</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;