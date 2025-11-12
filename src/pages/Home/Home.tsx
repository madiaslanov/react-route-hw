import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export function Home() {
    return (
        <div className={styles.homeContainer}>
            <img
                src="https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=2070"
                alt="Tech products"
                className={styles.homeImage}
            />
            <div className={styles.content}>
                <h1>Welcome to Our Product Catalog</h1>
                <p>
                    This is a sample application built with React, demonstrating client-side routing,
                    data fetching from a live API, and component-based architecture.
                </p>
                <Link to="/items" className={styles.ctaButton}>
                    Browse Products
                </Link>
            </div>
        </div>
    );
}