import { createContext, useContext, useEffect, useState } from "react";

interface ThemeProviderProps {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    getTheme: () => 'light' | 'dark';
}

const ThemeContext = createContext<ThemeProviderProps>({
    theme: 'dark',
    setTheme: () => null,
    getTheme: () => 'dark',
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setThemeState] = useState<'light' | 'dark'>('dark');

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
        document.documentElement.setAttribute('data-bs-theme', savedTheme === 'light' ? 'light' : 'dark');
    }, []);

    const setTheme = (newTheme: 'light' | 'dark') => {
        const transHandler = transitionHandler();
        transHandler.disable();
        setThemeState(newTheme);
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        transHandler.enable();

        localStorage.setItem('theme', newTheme);
    }

    const getTheme = () => {
        return theme;
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, getTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    return useContext(ThemeContext);
}