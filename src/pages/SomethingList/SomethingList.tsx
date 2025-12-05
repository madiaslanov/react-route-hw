import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../../components/Card/Card';
import { Spinner } from '../../components/Spinner/Spinner';
import { ErrorBox } from '../../components/ErrorBox/ErrorBox';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchItems } from '../../features/items/itemsSlice';
import styles from './SomethingList.module.css';

export const SomethingList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { list, loadingList, errorList } = useAppSelector((state) => state.items);
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    useEffect(() => {
        dispatch(fetchItems(query));
    }, [dispatch, query]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        if (newQuery) {
            setSearchParams({ q: newQuery });
        } else {
            setSearchParams({});
        }
    };

    if (loadingList) return <Spinner />;
    if (errorList) return <ErrorBox message={errorList} />;

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
            {list.length > 0 ? (
                <div className={styles.list}>
                    {list.map((item) => (
                        <Card key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <p className={styles.noResults}>No products found for "{query}"</p>
            )}
        </div>
    );
};