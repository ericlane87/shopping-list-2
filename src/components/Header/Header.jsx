import React from 'react';
{/*import './Header.css';*/}
import styles from './Header.module.css';
import onlineshopping from './OnlineShopping.png';

function Header() {
    return (
        <header className="banner-header">
            <img className={styles.logo} alt="Online Shop" src={onlineshopping} />
            <h1>My Shopping List</h1>
        </header>
    );
}

export default Header;
