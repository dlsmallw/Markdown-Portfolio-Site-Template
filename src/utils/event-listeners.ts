import { useEffect, useRef, useState } from "react";

/**
 * React hook function for handling automatic container wrapping when changing the dimensions of the window.
 * @returns     A reference to the wrapping container and a boolean that indicates whether 
 *              the container is wrapped.
 */
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
                let childWidth = 0;

                if (child.id === 'wrapping-separator') {
                    const sepVisibility = child.style.visibility;
                    const sepPosition = child.style.position;
                    const sepDisplay = child.style.display;

                    if (sepDisplay === 'none') {
                        child.style.visibility = 'hidden';
                        child.style.position = 'absolute';
                        child.style.display = 'block';
                    }
                    

                    childWidth = child.getBoundingClientRect().width;
                    const gapCorrectedWidth = !Number.isNaN(gapVal) ? childWidth + (gapVal * 2) : childWidth;

                    if (sepDisplay === 'none') {
                        child.style.display = sepDisplay;
                        child.style.visibility = sepVisibility;
                        child.style.position = sepPosition;
                    }

                    totalChildrenWidth += gapCorrectedWidth;
                    
                } else {
                    childWidth = child.scrollWidth;
                    totalChildrenWidth += childWidth;
                }
            });

            setIsWrapped(totalChildrenWidth > containerWidth);
        }

        const resizeObserver = new ResizeObserver(checkIsWrapped);
        resizeObserver.observe(container);

        checkIsWrapped();

        return () => resizeObserver.disconnect();
    }, [])

    return { containerRef, isWrapped };
}

/**
 * React hook function for tracking which section the user is at while scrolling.
 * @param sectionIDs        The list of sections available to scroll.
 * @param options           Options that mutate the algorithms logic for determining the current section.
 * @returns                 The current active section the user is at.
 */
export function useScrollSpy(sectionState: string | null, sectionIDs: string[], options?: IntersectionObserverInit): string | null { 
    const [activeSection, setActiveSection] = useState<string | null>(sectionState || sectionIDs[0] || null);
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

const MOBILE_BREAKPOINT = 768;

/**
 * React hook function for tracking if using mobile device (by screen size).
 * @returns     A boolean representing if it is a mobile device or not.
 */
export function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches;
    });

    useEffect(() => {
        const ql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
        const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);

        ql.addEventListener('change', onChange);

        return () => {
            ql.removeEventListener('change', onChange);
        }
    }, []);

    return isMobile;
}

/**
 * React hook function for tracking whether the input type is mouse or touch/pen.
 * @returns         A boolean variable, isMouse, indicating if a mouse is being used.
 */
export function useIsMouseInput() {
    const [isMouse, setIsMouse] = useState(false)

    useEffect(() => {
        const handlePointerEvent = (e: PointerEvent) => {
            const type = e.pointerType;
            if (type) {
                if (type === 'mouse') {
                    setIsMouse(true);
                } else {
                    setIsMouse(false);
                }
            }
        } 

        window.addEventListener('pointerdown', handlePointerEvent);
        window.addEventListener('pointermove', handlePointerEvent);

        return () => {
        window.removeEventListener('pointerdown', handlePointerEvent);
        window.removeEventListener('pointermove', handlePointerEvent);
        };
    }, [isMouse]);

    return isMouse;
}