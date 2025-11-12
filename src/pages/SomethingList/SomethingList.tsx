import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getItems } from '../../services/itemsService';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorBox } from '../../components/ErrorBox/ErrorBox';
import { Product } from '../../types/product';
import styles from './SomethingList.module.css';

export const SomethingList: React.FC = () => {
    const [items, setItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getItems(query);
                setItems(data.products);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        if (newQuery) {
            setSearchParams({ q: newQuery });
        } else {
            setSearchParams({});
        }
    };

    if (loading) return <Spinner />;
    if (error) return <ErrorBox message={error} />;

    return (
        <div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search for products..."
                    className={styles.searchInput}
                />
            </div>
            {items.length > 0 ? (
                <div className={styles.list}>
                    {items.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className={styles.noResults}>No products found for "{query}"</p>
            )}
        </div>
    );
};