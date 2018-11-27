import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../routes/names';
import { withGlobalState } from '../../hocs/GlobalState';

import SignoutButton from '../SignoutButton';


const Navigation = (props) => {
  console.log('props @ Navigation: ', props);
  return (
    <div>
      { 
        props.isAuthenticated
          ? <NavigationAuth /> 
          : null 
      }
    </div>
  );
}

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.ADMIN}>Admin</Link>
    </li>
    <li>
      <SignoutButton />
    </li>
  </ul>
);

export default withGlobalState(Navigation);
