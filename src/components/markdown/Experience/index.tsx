import type { HTMLAttributes } from 'react';
import styles from './component.module.css';
import { WrappingContainer } from '../WrappingContainer';

const CompanyBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.companyBlock} ${props.className ?? ''}`} />
}

const CompanyTitle: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.companyTitle} ${props.className ?? ''}`} />
}

const PositionBlock: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <div {...props} className={`${styles.positionBlock} ${props.className ?? ''}`}  />
}

const PositionDetails: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    return <WrappingContainer {...props} className={`${styles.positionDetails} ${props.className ?? ''}`} />
}

const ComponentRegistry = {
    ['company-block']: CompanyBlock,
    ['company-title']: CompanyTitle,
    ['position-block']: PositionBlock,
    ['position-details']: PositionDetails,
};

export default ComponentRegistry;