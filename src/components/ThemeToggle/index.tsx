import React, { useEffect, useState } from "react";

import LightModeIcon from '@assets/light-mode.svg?react';
import DarkModeIcon from '@assets/dark-mode.svg?react';

import { useIsMobile } from "@utils/event-listeners";

import styles from './component.module.css';

const ThemeToggle: React.FC = () => {
    const isMobile = useIsMobile();
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
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setThemeState(savedTheme === 'light' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');
    }, []);
    
    return (
        <div 
            className={styles.themeToggleContainer} 
            id="theme-toggle-container" 
            onClick={toggleTheme} 
            title='Toggle Theme'
        >
            <LightModeIcon
                className={styles.lightModeIcon}
                style={{
                    display: theme === 'light' ? 'block' : 'none',
                    opacity: theme === 'light' ? 1 : 0,
                    width: isMobile ? 'var(--text-2xl)' : 'var(--text-xl)'
                }}
            />
            <DarkModeIcon
                className={styles.darkModeIcon}
                style={{
                    display: theme === 'dark' ? 'block' : 'none',
                    opacity: theme === 'dark' ? 1 : 0,
                    width: isMobile ? 'var(--text-2xl)' : 'var(--text-xl)'
                }}
            />
        </div>
    );
};

export default ThemeToggle;