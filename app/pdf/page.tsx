'use client'

// mport Image from "next/image";

import { SyntheticEvent, useEffect, useState } from "react";
// import ReactPDF from '@react-pdf/renderer'
// import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import { Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
// import { Page, Document } from 'react-pdf';
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';   // Recommended for text selection, etc.
// import 'react-pdf/dist/esm/Page/TextLayer.css';         // Recommended for text layer
// const pdfjs = require("@/pdf.js/build/generic/build/pdf.mjs");
// const worker = require("@/pdf.js/build/generic/build/pdf.worker.mjs");
// const sandbox = require("@/pdf.js/build/generic/build/pdf.sandbox.mjs");

interface PDFProps {
  pdf: string;
}


export default function PDFPage({ pdf } : PDFProps) {
    
  const [ curPDF, setPDF ] = useState('');

  useEffect(() => {
    if (!pdf) {
      setPDF('/test_pdf.pdf');
    } else {
      setPDF(pdf);
    }
    const reader: FileReader = new FileReader();
    // pdfjs.GlobalWorkerOptions.workerSrc = curPDF;

  }, [pdf])
  
  // const reader: FileReader = new FileReader();
  console.log(curPDF)

  return (
      <>
      <h1>test</h1>
      {/* <iframe src={`https://docs.google.com/gview?url=${pdf}&embedded=true`} className="w-full h-full"></iframe> */}
      {/* <iframe src={curPDF} className="w-full h-full"></iframe> */}
      {/* {curPDF ? (<object data={curPDF} width="100%" height="600px" type="application/pdf">
          <p>Your browser doesn’t support PDFs. Please download the PDF to view it: <a href="/your-pdf-url.pdf">Download PDF</a>.</p>
      </object>) : <p>No pdf</p>} */}
      {curPDF ? (
        <iframe src={`pdfjs/web/viewer.html?file=${curPDF}`} width={"100%"} height={"1000px"}></iframe>
        ) : <p>No pdf</p>
      }
      {/* <PDFViewer>
          <MyDocument />
      </PDFViewer> */}
      </>
  )
}