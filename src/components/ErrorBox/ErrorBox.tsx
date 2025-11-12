import React from 'react';
import styles from './ErrorBox.module.css';

interface ErrorBoxProps {
    message: string;
}

export const ErrorBox: React.FC<ErrorBoxProps> = ({ message }) => {
    return (
        <div className={styles.errorBox}>
            <p>Error: {message || 'An unknown error occurred.'}</p>
        </div>
    );
};