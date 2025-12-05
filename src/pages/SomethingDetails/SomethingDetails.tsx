import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ErrorBox } from '../../components/ErrorBox/ErrorBox';
import styles from './SomethingDetails.module.css';
import { Spinner } from '../../components/Spinner/Spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchItemById } from '../../features/items/itemsSlice';

export const SomethingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedItem, loadingItem, errorItem } = useAppSelector((state) => state.items);

    useEffect(() => {
        if (!id) {
            return;
        }
        dispatch(fetchItemById(id));
    }, [dispatch, id]);

    if (loadingItem) return <Spinner />;
    if (errorItem) {
        const errorMessage = errorItem.includes('not found') 
            ? `Product with ID ${id} not found.` 
            : errorItem;
        return <ErrorBox message={errorMessage} />;
    }
    if (!selectedItem) return <ErrorBox message="Product data is unavailable." />;

    return (
        <div className={styles.detailsContainer}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                &larr; Back
            </button>
            <div className={styles.content}>
                <div className={styles.imageGallery}>
                    <img src={selectedItem.thumbnail} alt={selectedItem.title} className={styles.mainImage} />
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{selectedItem.title}</h1>
                    <p className={styles.description}>{selectedItem.description}</p>
                    <p className={styles.category}><strong>Category:</strong> {selectedItem.category}</p>
                    <p className={styles.price}><strong>Price:</strong> ${selectedItem.price}</p>
                    <p className={styles.rating}><strong>Rating:</strong> {selectedItem.rating} / 5</p>
                    <p className={styles.stock}><strong>In Stock:</strong> {selectedItem.stock} units</p>
                    <p className={styles.brand}><strong>Brand:</strong> {selectedItem.brand}</p>
                </div>
            </div>
        </div>
    );
};
