'use client'

// mport Image from "next/image";
import { SyntheticEvent, useEffect, useState } from "react";
import ReactPDF from '@react-pdf/renderer'
// import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { Page, Document } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';   // Recommended for text selection, etc.
import 'react-pdf/dist/esm/Page/TextLayer.css';         // Recommended for text layer


interface PDFProps {
    pdf: string;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const PdfViewer = ({ pdf } : PDFProps) => {
    const testPDF = "/test_pdf.pdf";
    const fileURL = pdf ? pdf : testPDF;
    console.log(fileURL);
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [scale, setScale] = useState<number>(1.0);
    const [goToPageInput, setGoToPageInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [pdfError, setPdfError] = useState<string | null>(null);
  
    function onDocumentLoadSuccess({ numPages: nextNumPages } : number | any) {
      setNumPages(nextNumPages);
      setPageNumber(1); // Reset to first page on new document
      setIsLoading(false);
      setPdfError(null);
    }
  
    function onDocumentLoadError(error: any) {
      console.error("Error loading PDF:", error);
      setPdfError("Failed to load PDF. Please check the file or URL.");
      setIsLoading(false);
    }
  
    function goToPrevPage() {
      setPageNumber((prevPageNumber) => Math.max(1, prevPageNumber - 1));
    }
  
    function goToNextPage() {
        if (numPages) {
            setPageNumber((prevPageNumber) => Math.min(numPages, prevPageNumber + 1));
        }
    }
  
    function handleGoToPageInputChange(event: SyntheticEvent) {
        const target = event.target as HTMLInputElement;
        setGoToPageInput(target.value);
    }
  
    function handleGoToPage() {
        if (!numPages) {
            alert("Error, no pages");
            return;
        }
        const page = parseInt(goToPageInput, 10);
        if (page >= 1 && page <= numPages) {
            setPageNumber(page);
            setGoToPageInput(''); // Clear input after navigation
        } else {
            alert(`Please enter a page number between 1 and ${numPages}.`);
        }
    }
  
    function zoomIn() {
        setScale((prevScale) => Math.min(3.0, prevScale + 0.2)); // Max zoom 300%
    }
  
    function zoomOut() {
        setScale((prevScale) => Math.max(0.5, prevScale - 0.2)); // Min zoom 50%
    }
  
    useEffect(() => {
        // Reset loading state when fileUrl changes
        setIsLoading(true);
        setPdfError(null);
        setNumPages(null);
        setPageNumber(1); // Reset to page 1 when a new file is loaded
    }, [fileURL]);
  
  
    
    const buttonStyle = "px-[10px] py-[5px] mx-[5px] my-[0] cursor-pointer";
  
    // const pageInfoStyle = {
    //     margin: '0 10px',
    // };
    const pageInfoStyle = "my-[0] mx-[10px]";
    
    const pdfContainerStyle = "flex justify-center items-start overflow-auto max-h-[calc(100vh - 100px)] p-[20px] bg-[#e9e9e9]";
  
    return (
      <div>
        <div className="flex items-center justify-center p-[10px] bg-[#f0f0f0] border-b-[1px_solid_#ccc] flex-wrap gap-[10px]">
          <button className={buttonStyle} onClick={goToPrevPage} disabled={pageNumber <= 1 || isLoading}>
            Prev
          </button>
          <span className={pageInfoStyle}>
            Page {pageNumber} of {numPages || '--'}
          </span>
          <button className={buttonStyle} onClick={goToNextPage} disabled={(numPages === null) || isLoading || pageNumber >= numPages}>
            Next
          </button>
          <div className="flex items-center">
            <input
              type="number"
              className="w-[50px] text-center mx-[5px] my-[0]"
              value={goToPageInput}
              onChange={handleGoToPageInputChange}
              placeholder={pageNumber.toString()}
              min="1"
              max={numPages || 1}
              disabled={isLoading}
            />
            <button className={buttonStyle} onClick={handleGoToPage} disabled={isLoading}>
              Go
            </button>
          </div>
          <button className={buttonStyle} onClick={zoomOut} disabled={isLoading}>
            Zoom Out
          </button>
          <button className={buttonStyle} onClick={zoomIn} disabled={isLoading}>
            Zoom In
          </button>
          <span className={pageInfoStyle}>Zoom: {Math.round(scale * 100)}%</span>
        </div>
  
        {isLoading && <div className="text-center p-[20px]">Loading PDF...</div>}
        {pdfError && <div className="text-center p-[20px] text-[red]">{pdfError}</div>}
        
        {!isLoading && !pdfError && fileURL && (
          <div className={pdfContainerStyle}>
            <Document
              file={fileURL}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading="" // Disable react-pdf's default loading, we handle it
              error=""   // Disable react-pdf's default error, we handle it
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                renderAnnotationLayer={true} // Enable annotations (like links)
                renderTextLayer={true}       // Enable text selection
                loading="" // Disable react-pdf's default loading for page
              />
            </Document>
          </div>
        )}
         {!fileURL && !isLoading && <div className="text-center p-[20px]">Please select a PDF file to view.</div>}
      </div>
    );
  };

export default PdfViewer;  

// export default function PDFPage({ pdf } : PDFProps) {
    
//     const [ curPDF, setPDF ] = useState('');
//     useEffect(() => {
//         if (!pdf) {
//             setPDF('/test_pdf.pdf');
//         } else {
//             setPDF(pdf);
//         }
//         const reader: FileReader = new FileReader();
//         pdfjs.GlobalWorkerOptions.workerSrc = curPDF;

//     }, [pdf])
    
//     // const reader: FileReader = new FileReader();
//     console.log(curPDF)

//     return (
//         <>
//         <h1>test</h1>
//         {/* <iframe src={`https://docs.google.com/gview?url=${pdf}&embedded=true`} className="w-full h-full"></iframe> */}
//         {/* <iframe src={curPDF} className="w-full h-full"></iframe> */}
//         {/* {curPDF ? (<object data={curPDF} width="100%" height="600px" type="application/pdf">
//             <p>Your browser doesn’t support PDFs. Please download the PDF to view it: <a href="/your-pdf-url.pdf">Download PDF</a>.</p>
//         </object>) : <p>No pdf</p>} */}
//         <PDFViewer>
//             <MyDocument />
//         </PDFViewer>
//         </>
//     )
// }