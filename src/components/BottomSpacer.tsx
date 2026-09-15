import React, { useEffect, useState } from 'react';

const BottomSpacer: React.FC = () => {
    const [spacerHeight, setSpacerHeight] = useState<string>('0');
    const [windowDimensions, setWindowDimensions] = useState<{
        height: number;
        width: number;
    }>({ height: window.innerHeight, width: window.innerWidth});

    const handleWindowResize = () => {
        setWindowDimensions((prev) => ({ ...prev, height: window.innerHeight, width: window.innerWidth }));
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    }, []);

    useEffect(() => {   
        const elements = document.querySelectorAll('.section');
        const lastSectionElement = elements[elements.length - 1] as HTMLElement | null;
        const lastSectionHeight = lastSectionElement?.offsetHeight || 0;
        setSpacerHeight(`calc(var(--view-height) - ${lastSectionHeight}px)`);
    }, [windowDimensions]);
        
    return (
        <div id="bottom-spacer" style={{height: spacerHeight}}></div>
    )
};

export default BottomSpacer;