import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';
import styles from './Card.module.css';

interface CardProps {
    item: Product;
}

export const Card: React.FC<CardProps> = ({ item }) => {
    return (
        <div className={styles.card}>
            <img src={item.thumbnail} alt={item.title} className={styles.cardImage} />
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <Link to={`/items/${item.id}`} className={styles.cardLink}>
                    View Details
                </Link>
            </div>
        </div>
    );
};