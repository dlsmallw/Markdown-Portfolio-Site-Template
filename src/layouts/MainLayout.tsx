import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="App" style={CustomStyles.mainContainer}>
            <header className="App-header">
                <Navbar />
                <main style={CustomStyles.mainContent}>
                    {children}
                </main>
            </header>
        </div>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
    },
};

export default MainLayout;