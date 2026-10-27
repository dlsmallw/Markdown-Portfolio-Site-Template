import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigation } from "react-router";

/**
 * Helper for handling automatic container wrapping when changing the dimensions of the window.
 * @returns         A reference to the wrapping container and a boolean that indicates whether 
 *                  the container is wrapped.
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
 * Facilitates tracking which section the user is at while scrolling.
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

export function useScrollRestorationListener(
    beforeCallback: () => void, 
    afterCallback: () => void
) {
    const location = useLocation();
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state !== 'idle') 
            beforeCallback();
        else 
            afterCallback();
    }, [location.key, navigation.state]);
}

/**
 * Used to track the current page when using the PDFPreviewer component to preview a PDF.
 * @param scrollContainerRef        A RefObject of the scroll container.
 * @param numPages                  The number of pages the PDF contains.
 * @returns                         The page number of the current page in view.
 */
export function usePageSpy(scrollContainerRef: React.RefObject<HTMLDivElement | null>, numPages: number | null) {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (!scrollContainerRef.current || !numPages) return;

        const pageElements = scrollContainerRef.current.querySelectorAll('.pdf-page-wrapper');
        const visibilityMap = new Map();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const pageNum = Number(entry.target.getAttribute('data-page'));
                    visibilityMap.set(pageNum, entry.intersectionRatio);
                });

                // Determine which page has the highest visible percentage
                let highestRatio = 0;
                let mostVisiblePage = currentPage;

                visibilityMap.forEach((ratio, pageNum) => {
                    if (ratio > highestRatio) {
                        highestRatio = ratio;
                        mostVisiblePage = pageNum;
                    }
                });

                if (highestRatio > 0 && mostVisiblePage !== currentPage) {
                    setCurrentPage(mostVisiblePage);
                }
            },
            {
                root: scrollContainerRef.current, // Observe intersections relative to the scroll container
                rootMargin: '0px',
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] // Granular tracking steps
            }
        );

        pageElements.forEach((el: Element) => observer.observe(el));

        return () => {
            pageElements.forEach((el: Element) => observer.unobserve(el));
            observer.disconnect();
        };
    }, [currentPage, numPages]);

    return currentPage;
}

/**
 * Helper for monitoring a specific attribute of the HTML Document element.
 * @param attrName          The name/key of the attribute.
 * @param fallback          The fallback value to default to if desired.
 * @returns                 The attributes current value.
 */
export function documentAttrObserver(attrName: string, fallback: any = undefined) {
    const [attrValue, setAttrValue] = useState(() => 
        document.documentElement.getAttribute(attrName) || fallback
    );

    useEffect(() => {
        const attrChangeObserver = (mutationList: MutationRecord[]) => {
            for (const mutation of mutationList) {
                if (
                    (mutation.type === 'attributes') &&
                    (mutation.attributeName === attrName)
                ) {
                    const currAttrValue = (mutation.target as Element).getAttribute(attrName);
                    setAttrValue(currAttrValue || fallback);
                }
            }
        };

        const observer = new MutationObserver(attrChangeObserver);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: [attrName]
        });

        return () => {
            observer.disconnect();
        }
    }, []);

    return attrValue;
}

const MOBILE_BREAKPOINT = 768;

/**
 * Listener for tracking if using mobile device (by screen size).
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

export function useWindowSizeThreshold(threshold: number) {
    const [isBelow, setIsBelow] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < threshold;
        }

        return false;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => {
            setIsBelow(window.innerWidth < threshold);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return isBelow;
}