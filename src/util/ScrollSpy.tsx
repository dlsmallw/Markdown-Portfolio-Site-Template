import { useEffect, useRef, useState } from 'react';

export function useScrollSpy(sectionIDs: string[], options?: IntersectionObserverInit): string | null { 
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const visibleSections = useRef<Record<string, boolean>>({});

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                visibleSections.current[entry.target.id] = entry.isIntersecting;
            });

            const currActive = sectionIDs.find(id => visibleSections.current[id]);
            if (currActive) {
                setActiveSection(currActive);
            }
        }, options);

        sectionIDs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        }
    }, [sectionIDs, options]);

    return activeSection;
}