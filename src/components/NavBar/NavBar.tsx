import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export function NavBar() {
    return (
        <nav className={styles.nav}>
            <NavLink
                to="/"
                className={({ isActive } ) => (isActive ? styles.active : styles.link)}
            >
                Home
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
            >
                About
            </NavLink>
            <NavLink
                to="/items"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
            >
                Products
            </NavLink>
            <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : styles.link)}
            >
                Login
            </NavLink>
        </nav>
    );
}