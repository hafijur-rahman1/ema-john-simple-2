import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop">shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/inventory">Manage Shopping</Link>
                <button style={ {height:'28px',marginBottom:'4px',backgroundColor:'yellow',border:'none',cursor:'pointer',borderRadius:'4px'}} onClick={() =>setLoggedInUser({}) }>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;