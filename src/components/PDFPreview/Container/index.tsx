import { useMemo, useRef, useState, type HTMLAttributes } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import UpperControlBar from "../Controls";
import { usePageSpy } from "@utils";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import styles from './component.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface PDFPreviewerProps extends HTMLAttributes<HTMLDivElement> {
    fileURL: string;
}

const PDFPreviewer: React.FC<PDFPreviewerProps> = ({ fileURL }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [zoom, setZoom] = useState(1);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const pageContainerRef = useRef<HTMLDivElement | null>(null);
    const file = useMemo(() => ({ url: fileURL }), [fileURL]);

    const currentPage = usePageSpy(scrollContainerRef, numPages);

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