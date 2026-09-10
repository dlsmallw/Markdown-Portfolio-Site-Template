import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="App" style={CustomStyles.mainContainer}>
            <Navbar />
            <main style={CustomStyles.mainContent}>
                {children}
            </main>
        </div>
    )
}

const CustomStyles: Record<string, React.CSSProperties> = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#282C34',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },
    mainContent: {
        flex: 1,
        // padding: '20px',
    },
};

export default MainLayout;