import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../firebase';
import styles from './Signup.module.css';

export function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError('Пароли не совпадают');
        }
        try {
            setError('');
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/profile');
        } catch (err) {
            setError('Не удалось создать аккаунт');
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2>Регистрация</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button disabled={loading} type="submit">
                    Зарегистрироваться
                </button>
            </form>
            <p>
                Уже есть аккаунт? <Link to="/login">Войти</Link>
            </p>
        </div>
    );
}