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

interface PDFPreviewerProps extends HTMLAttributes<HTMLDivElement> {
    fileURL: string;
}

const PDFPreviewer: React.FC<PDFPreviewerProps> = ({ fileURL, ...props }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !numPages) return;

        const pageElements = containerRef.current.querySelectorAll('.pdf-page-wrapper');
        const visibilityMap = new Map();

        const observer = new IntersectionObserver(
            (entries) => {
                console.log(entries)
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
                root: containerRef.current, // Observe intersections relative to the scroll container
                rootMargin: '0px',
                threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] // Granular tracking steps
            }
        );

        pageElements.forEach((el) => observer.observe(el));

        return () => {
            pageElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, [numPages, currentPage]);

    const file = useMemo(() => ({ url: fileURL }), [fileURL]);

    const onPDFLoad = ({ numPages }: { numPages: number}) => {
        setNumPages(numPages);
    }

    return (
        <div className={styles.pdfPreviewContainer} id='pdf-preview-container'>
            <div 
                ref={containerRef}
                className={styles.pdfScrollContainer}
                
            >
                <Document file={file} onLoadSuccess={onPDFLoad} >
                    {numPages && Array.from({ length: numPages }, (_, index) => {
                        const pageNum = index + 1
                        return (
                            <div 
                                className={styles.pdfPageWrapper}
                                id={`page-${pageNum}`}
                                key={`page_${pageNum}`} 
                                data-page={pageNum}
                                
                            >
                                <Page 
                                    pageNumber={pageNum} 
                                    scale={1.5}
                                    // renderTextLayer={false}      // Optional performance configurations
                                    // renderAnnotationLayer={false} // Optional performance configurations
                                />
                            </div>
                        )})}
                </Document>
            </div>

            {numPages && (
                <div className={styles.pageIndexContainer}>
                    <span className={styles.pageIndexText} >
                        Page {currentPage} of {numPages}
                    </span>
                </div>
            )}
        </div>
    )
}

export default PDFPreviewer;