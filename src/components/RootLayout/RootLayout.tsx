import { Outlet } from 'react-router-dom';
import { NavBar } from '../NavBar/NavBar';
import styles from './RootLayout.module.css';

export function RootLayout() {
    return (
        <>
            <NavBar />
            <main className={styles.mainContent}>
                <Outlet />
            </main>
        </>
    );
}