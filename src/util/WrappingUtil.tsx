import { useEffect, useRef, useState } from "react";

export function useIsWrapped() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isWrapped, setIsWrapped] = useState(false);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        const checkIsWrapped = () => {
            const children = Array.from(container.children) as HTMLElement[];

            if (children.length < 2) return;

            const containerStyle = window.getComputedStyle(container);
            const gapVal = parseFloat(containerStyle.columnGap);

            const containerWidth = container.offsetWidth;
            let totalChildrenWidth = 0;

            children.forEach((child) => {
                console.log(`Child Node: ${child.id}`)
                if (child.id === 'wrapping-separator') {
                    const sepVisibility = child.style.visibility;
                    const sepPosition = child.style.position;
                    const sepDisplay = child.style.display;

                    if (sepDisplay === 'none') {
                        child.style.visibility = 'hidden';
                        child.style.position = 'absolute';
                        child.style.display = 'block';
                    }
                    

                    const width = child.getBoundingClientRect().width;
                    const gapCorrectedWidth = !Number.isNaN(gapVal) ? width + (gapVal * 2) : width;

                    if (sepDisplay === 'none') {
                        child.style.display = sepDisplay;
                        child.style.visibility = sepVisibility;
                        child.style.position = sepPosition;
                    }

                    totalChildrenWidth += gapCorrectedWidth;
                    
                } else {
                    totalChildrenWidth += child.scrollWidth;
                }
            })

            setIsWrapped(totalChildrenWidth > containerWidth);
        }

        const resizeObserver = new ResizeObserver(checkIsWrapped);
        resizeObserver.observe(container);

        checkIsWrapped();

        return () => resizeObserver.disconnect();
    }, [])

    return { containerRef, isWrapped };
}