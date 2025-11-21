import {NavLink, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import styles from './NavBar.module.css';

export function NavBar() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Не удалось выйти", error);
        }
    };

    return (
        <nav className={styles.nav}>
            <NavLink to="/" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                Home
            </NavLink>
            <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                About
            </NavLink>
            <NavLink to="/items" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                Products
            </NavLink>

            {currentUser ? (
                <>
                    <NavLink to="/profile" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                        Profile
                    </NavLink>
                    <button onClick={handleLogout} className={styles.linkButton}>Logout</button>
                </>
            ) : (
                <>
                    <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                        Login
                    </NavLink>
                    <NavLink to="/signup" className={({isActive}) => (isActive ? styles.active : styles.link)}>
                        Signup
                    </NavLink>
                </>
            )}
        </nav>
    );
}