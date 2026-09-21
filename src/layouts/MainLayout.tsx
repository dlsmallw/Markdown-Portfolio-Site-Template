import React from 'react';
import Navbar from '../components/Navbar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="App">
            <Navbar />
            <main>
                {children}
            </main>
        </div>
    )
}

export default MainLayout;