import React from 'react';
import {NavLink} from 'react-router-dom';
import {Category} from '../../types';

interface Props {
  category: Category[];
}

const CategoryNav: React.FC<Props> = ({category}) => {
  return (
    <ul className="nav flex-column nav-underline">
      <li className="nav-item">
        <NavLink to="/" className="nav-link link-dark">All</NavLink>
      </li>
      {category.map((item) => (
        <li className="nav-item" key={item.id}>
          <NavLink to={`/quotes/${item.id}`} className='nav-link link-dark'>{item.title}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default CategoryNav;