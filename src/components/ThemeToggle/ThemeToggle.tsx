import React, { useEffect, useState } from "react";

import { ReactComponent as LightModeIcon } from '../../assets/theme/light-mode.svg';
import { ReactComponent as DarkModeIcon } from "../../assets/theme/dark-mode.svg";

import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
    const [theme, setThemeState] = useState<'light' | 'dark'>('dark');

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        const transHandler = transitionHandler();
        transHandler.disable();
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        transHandler.enable();

        localStorage.setItem('theme', newTheme);
    };

    const transitionHandler = () => {
        const style = document.createElement('style');

        const css = document.createTextNode(` * {
            -webkit-transition: none !important;
            -moz-transition: none !important;
            -o-transition: none !important;
            
            transition: none !important;
        }`);

        style.appendChild(css);

        const enable = () => document.head.removeChild(style);
        const disable = () => document.head.appendChild(style);
        return { enable, disable, style };
    }

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        setThemeState(savedTheme === 'light' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');
    }, []);
    
    return (
        <div className={styles.themeToggleContainer} id="theme-toggle-container" 
            onClick={toggleTheme} 
            title={`Toggle Theme`}
        >
            <LightModeIcon className={styles.lightModeIcon} style={{
                opacity: theme === 'light' ? 1 : 0,
                position: 'absolute' as const,
            }} />
            <DarkModeIcon className={styles.darkModeIcon} style={{
                opacity: theme === 'dark' ? 1 : 0,
            }} />
        </div>
    );
};

export { ThemeToggle };