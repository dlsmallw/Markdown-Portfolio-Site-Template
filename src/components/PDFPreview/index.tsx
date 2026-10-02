import { useEffect, useMemo, useRef, useState, type HTMLAttributes } from "react";

import { Document, Page } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import styles from './component.module.css';
import { pdfjs } from "react-pdf";
import ImageComponent from "../Image";

interface PDFPreviewerProps extends HTMLAttributes<HTMLDivElement> {
    fileURL: string;
}

interface UpperControlBarProps extends HTMLAttributes<HTMLDivElement> {
    numPages: number | null;
    currentPage: number;
    zoom: number;
    fileURL: string;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
}

function usePageSpy(scrollContainerRef: React.RefObject<HTMLDivElement | null>, numPages: number | null) {
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

const UpperControlBar: React.FC<UpperControlBarProps> = ({ zoom, setZoom, numPages, currentPage, fileURL }) => {
    const handleZoomIn = () => {
        setZoom((prev: number) => Math.min(prev + 0.1, 3.0));
    };

    const handleZoomOut = () => {
        setZoom((prev: number) => Math.max(prev - 0.1, 0.5));
    };

    return (
        <div className={styles.upperControlBar} >
            <div className={`${styles.controlGrid} ${styles.leftGrid}`} >
                {numPages && (
                    <>
                        <span className={styles.pageIndexText} >Page</span>
                        <span className={styles.pageIndexText} >{currentPage}</span>
                        <span className={styles.pageIndexText} >of</span>
                        <span className={styles.pageIndexText} >{numPages}</span>
                    </>
                )}
            </div>
            <div className={styles.divider} />
            <div className={`${styles.controlGrid} ${styles.centerGrid}`} >
                <div className={styles.zoomControls} >
                    
                    <ImageComponent
                        className={`${styles.zoomButton} ${styles.minusIcon} ${styles.icon}`}
                        src="/src/static/assets/icons/minus-svgrepo-com.svg"
                        ref={undefined}
                        onClick={handleZoomOut}
                    />
                    <div className={styles.zoomLevelContainer} >
                        {Math.round(zoom * 100)}%
                    </div>
                    <ImageComponent
                        className={`${styles.zoomButton} ${styles.plusIcon} ${styles.icon}`}
                        src="/src/static/assets/icons/plus-svgrepo-com.svg"
                        ref={undefined}
                        onClick={handleZoomIn}
                    />
                </div>
            </div>
            <div className={styles.divider} />
            <div className={`${styles.controlGrid} ${styles.rightGrid}`} >
                <a 
                    title="Download PDF" 
                    download={fileURL.split('/').pop() || 'document.pdf'} 
                    href={fileURL}
                    className={styles.downloadButton} 
                >
                    <ImageComponent
                        className={`${styles.downloadIcon} ${styles.icon}`}
                        src="/src/static/assets/icons/download-minimalistic-svgrepo-com.svg"
                        ref={undefined}
                    />
                </a>
            </div>
        </div>
    )
}

const PDFPreviewer: React.FC<PDFPreviewerProps> = ({ fileURL, ...props }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const pageContainerRef = useRef<HTMLDivElement | null>(null);
    const file = useMemo(() => ({ url: fileURL }), [fileURL]);

    const currentPage = usePageSpy(scrollContainerRef, numPages);
    // const { width, height } = responsivePDFResizeObserver(pageContainerRef);

    const onPDFLoad = ({ numPages }: { numPages: number}) => {
        setNumPages(numPages);
    }

    return (
        <div className={styles.pdfPreviewContainer} id='pdf-preview-container'>
            <UpperControlBar 
                zoom={zoom} 
                setZoom={setZoom} 
                numPages={numPages} 
                currentPage={currentPage} 
                fileURL={fileURL} 
            />
            <div ref={scrollContainerRef} className={styles.pdfScrollContainer} >
                <Document file={file} onLoadSuccess={onPDFLoad} >
                    <div ref={pageContainerRef} className={styles.pageContainer} >
                    {numPages && Array.from({ length: numPages }, (_, index) => {
                        const pageNum = index + 1
                        return (
                            <div 
                                className={`${styles.pdfPageWrapper} pdf-page-wrapper`}
                                id={`page-${pageNum}`}
                                key={`page_${pageNum}`} 
                                data-page={pageNum}
                            >
                                <Page 
                                    pageNumber={pageNum} 
                                    scale={zoom}
                                    width={1000}
                                />
                            </div>
                        )})}
                    </div>
                </Document>
            </div>
            <div className={styles.bottomBar} />
        </div>
    )
}

export default PDFPreviewer;