import React, { useEffect, useState } from 'react';

const BottomSpacer: React.FC = () => {
    const [spacerHeight, setSpacerHeight] = useState<string>('0');

    useEffect(() => {
        const elements = document.querySelectorAll('.page-section');
        const lastSectionElement = elements[elements.length - 1] as HTMLElement | null;
        const windowHeight = window.innerHeight;
        const lastSectionHeight = lastSectionElement?.offsetHeight || 0;
        setSpacerHeight(`calc(calc(${windowHeight}px - calc(max(8vh, 50px) + 20px)) - ${lastSectionHeight}px)`);
    }, []);
        

    return (
        <div id="bottom-spacer" style={{height: spacerHeight}}></div>
    )
};

export default BottomSpacer;