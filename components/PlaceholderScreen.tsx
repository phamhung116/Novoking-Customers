import React from 'react';
import { styles } from '../utils/styles';

interface PlaceholderScreenProps {
    title: string;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title }) => (
    <div style={styles.screenContent}><h2 style={styles.header}>{title}</h2></div>
);

export default PlaceholderScreen;
