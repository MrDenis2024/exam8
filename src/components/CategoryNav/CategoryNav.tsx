import {NavLink} from 'react-router-dom';
import {useState} from 'react';

const CategoryNav = () => {
  const [category] = useState([
    {title: 'Star Wars', id: 'star-wars'},
    {title: 'Famous people', id: 'famous-people'},
    {title: 'Saying', id: 'saying'},
    {title: 'Humour', id: 'humour'},
    {title: 'Motivational', id: 'motivational'},
  ]);
  return (
    <ol className="nav flex-column nav-underline">
      <li className="nav-item">
        <NavLink to="/" className="nav-link">All</NavLink>
      </li>
      {category.map((item) => (
        <li className="nav-item" key={item.id}>
          <NavLink to={`/quotes/${item.id}`} className='nav-link'>{item.title}</NavLink>
        </li>
      ))}
    </ol>
  );
};

export default CategoryNav;