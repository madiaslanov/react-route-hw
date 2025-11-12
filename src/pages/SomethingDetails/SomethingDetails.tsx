import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemById } from '../../services/itemsService';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorBox } from '../../components/ErrorBox/ErrorBox';
import { Product } from '../../types/product';
import styles from './SomethingDetails.module.css';

export const SomethingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [item, setItem] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Product ID is missing.');
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getItemById(id);
                setItem(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message.includes('not found') ? `Product with ID ${id} not found.` : err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <ErrorBox message={error} />;
    if (!item) return <ErrorBox message="Product data is unavailable." />;

    return (
        <div className={styles.detailsContainer}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                &larr; Back
            </button>
            <div className={styles.content}>
                <div className={styles.imageGallery}>
                    <img src={item.thumbnail} alt={item.title} className={styles.mainImage} />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{item.title}</h1>
                    <p className={styles.description}>{item.description}</p>
                    <p className={styles.category}><strong>Category:</strong> {item.category}</p>
                    <p className={styles.price}><strong>Price:</strong> ${item.price}</p>
                    <p className={styles.rating}><strong>Rating:</strong> {item.rating} / 5</p>
                    <p className={styles.stock}><strong>In Stock:</strong> {item.stock} units</p>
                    <p className={styles.brand}><strong>Brand:</strong> {item.brand}</p>
                </div>
            </div>
        </div>
    );
};
