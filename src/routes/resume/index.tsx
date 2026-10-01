import React from 'react';

import styles from './route.module.css';
import PDFPreviewer from '../../components/PDFPreview';
import { useOutletContext } from 'react-router';
import type { AppDataContextType } from '../../types/DataLoading';

const Resume: React.FC = () => {
    const { resumePDFFileURL } = useOutletContext<AppDataContextType>();

    return (
        <>
            {resumePDFFileURL &&
                <div className={styles.resumeContainer}>
                    <PDFPreviewer fileURL={resumePDFFileURL} />
                </div>
            }
        </>
    )
}

export default Resume;