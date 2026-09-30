import { type HTMLAttributes, useEffect } from "react";

import './component.module.css';
import styles from './component.module.css';

const HeadshotContainer: React.FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
    useEffect(() => {
        const elements = document.querySelectorAll("#intro-section .cursor-tooltip");
        elements.forEach((elem) => {
            elem.remove();
        })
    }, []);
    
    return (
        <div className={styles.headshotContainer} id='headshot-container' {...props} />
    )
}

const ComponentRegistry = {
    headshotcontainer: (props: HTMLAttributes<HTMLDivElement>) => { 
        return <HeadshotContainer {...props} />
    },
}

export default ComponentRegistry;