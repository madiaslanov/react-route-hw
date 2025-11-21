import {useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../../firebase';
import {useAuth} from '../../context/AuthContext';
import styles from './Profile.module.css';

export function Profile() {
    const {currentUser} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Не удалось выйти', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Профиль</h2>
            <p>
                <strong>Email:</strong> {currentUser?.email}
            </p>
            <p>
                <strong>UID:</strong> {currentUser?.uid}
            </p>
            <button onClick={handleLogout}>Выйти</button>
        </div>
    );
}