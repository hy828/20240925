"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ZoomInOutlined, ZoomOutOutlined, CloudUploadOutlined, SyncOutlined, TikTokOutlined, TwitterOutlined, InstagramOutlined, YoutubeFilled } from '@ant-design/icons';
import { degrees, PDFDocument } from 'pdf-lib';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;
const documentOptions = {
	standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts`,
	cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
};

export default function PDFRotator() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(0.4);
  const [rotatedPages, setRotatedPages] = useState({});
  const [numPages, setNumPages] = useState(null);

  const handleFileUpload = (event) => {
    const file = event?.target?.files[0];
    if (file && file.type === 'application/pdf') {
      setLoading(true);
      setPdfFile(file);
    } else {
      console.error("Unsupported file format. Please upload a PDF.");
    }
  };

  const handleRotatePage = (pageNumber) => {
    setRotatedPages((prev) => ({
      ...prev,
      [pageNumber]: (prev[pageNumber] || 0) + 90,
    }));
  };

  const handleRemovePDF = () => {
    event.target.value = '';
    setPdfFile(null);
    setScale(0.4);
    setRotatedPages({});
  };

  const handleZoomIn = () => {
    setScale((prev) => (prev < 0.8 ? prev + 0.1 : prev));
  };

  const handleZoomOut = () => {
    setScale((prev) => (prev > 0.3 ? prev - 0.1 : prev));
  };

  const handlePdfLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };
  
  const handlePdfLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
  };

  const downloadRotatedPDF = async () => {
    // Check if pdfFile is present
    if (!pdfFile) {
      console.error("No PDF file uploaded.");
      return;
    }
    try {
      // Load the existing PDF file
      const arrayBuffer = await pdfFile.arrayBuffer();
      const existingPdfDoc = await PDFDocument.load(arrayBuffer);

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();

      // Loop through all pages and add them to the new document
      for (let i = 0; i < numPages; i++) {
        const [copiedPage] = await pdfDoc.copyPages(existingPdfDoc, [i]);
        const rotateDegree = rotatedPages[i + 1] || 0; // Get the rotation degree
        copiedPage.setRotation(degrees(rotateDegree)); // Rotate the page
        pdfDoc.addPage(copiedPage); // Add the rotated page to the new document
      }

      // Save the new PDF document
      const pdfBytes = await pdfDoc.save();

      // Create a blob and download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'rotated.pdf'; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error creating or downloading the rotated PDF:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <header style={{ padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'serif', fontWeight: '500', fontSize: '20px', padding: '10px' }}>PDF.ai</p>
        <nav 
        style={{ display: 'flex', fontWeight: '500', fontSize: '15px', cursor: 'pointer', color: '#000000'}}
        >
          <p style={{ padding: '10px' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
              Pricing
          </p>
          <p style={{ padding: '10px' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
              Chrome extension
          </p>
          <p style={{ padding: '10px' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
              Use cases
          </p>
          <p style={{ padding: '10px' }}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
              Get started
          </p>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f7f5ee', minHeight: '700px' }}>
        <div 
          style={{ 
            maxWidth: '500px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center', 
            margin: '0 auto', 
            marginBottom: '40px' 
        }}>
          <h1 style={{ fontFamily: 'serif', fontSize: '48px', paddingTop: '15px' }}>Rotate PDF Pages</h1>
          <p style={{ fontSize: '16px', paddingTop: '30px', color: '#757575', fontWeight: '500' }}>Simply click on a page to rotate it. You can then download your modified PDF.</p>
        </div>

        {/* Upload Section or PDF Controls */}
        {!pdfFile ? (
          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
            <label htmlFor="pdf-file-upload">
              <div style={{
                width: '275px',
                height: '350px',
                border: '1px dashed #d6d3d1',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#616161',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                fontWeight: '500',
              }}
              >
                <CloudUploadOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
                Click to upload or drag and drop
              </div>
            </label>
            {/* Hidden File Input */}
            <input
              id="pdf-file-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <div>
            {/* Control Buttons */}
            <button onClick={() => {
              for (let i = 1; i <= numPages; i++) {
                handleRotatePage(i);
              }
            }}
            style={{ backgroundColor: '#ff612f', padding: '10px 12px', border: 'none', color: 'white', fontWeight: '500', fontSize: '16px', borderRadius: '4px' }}
            >
              Rotate all
            </button>
            <button 
              onClick={handleRemovePDF} 
              style={{ 
                backgroundColor: '#1f2937', 
                padding: '10px 12px', 
                border: 'none', 
                color: 'white', 
                fontWeight: '500', 
                fontSize: '16px', 
                borderRadius: '4px', 
                marginLeft: '16px' 
            }}>
              Remove PDF
            </button>
            <button 
              onClick={handleZoomIn} 
              disabled={scale >= 0.8} 
              aria-label="Zoom in"
              style={{
                border: 'none', 
                backgroundColor: 'white', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                fontSize: '18px', 
                marginLeft: '16px', 
                backgroundColor: scale >= 0.8 ? '#f0f0f0' : 'white' 
            }}> 
              <ZoomInOutlined /> 
            </button>
            <button
              onClick={handleZoomOut} 
              disabled={scale <= 0.3} 
              aria-label="Zoom out"
              style={{
                border: 'none', 
                backgroundColor: 'white', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                alignItems: 'center', 
                justifyContent: 'center', 
                cursor: 'pointer', 
                fontSize: '18px', 
                marginLeft: '16px', 
                backgroundColor: scale <= 0.3 ? '#f0f0f0' : 'white' 
            }}> 
              <ZoomOutOutlined /> 
            </button>

            {/* PDF Preview */}
            <div style={{ marginTop: '20px', marginLeft: '10px', marginRight: '10px' }}>
              <Document
                options={documentOptions}
                file={pdfFile}
                onLoadSuccess={handlePdfLoadSuccess}
                renderMode="svg"
                onLoadError={handlePdfLoadError}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <div key={`page_${index + 1}`} style={{
                    padding: '10px',
                    margin: '12px',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    position: 'relative',
                    display: 'inline-block',
                    overflow: 'hidden',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    {/* Wrapper for centering the page inside the container */}
                    <div
                      style={{
                        width: `${scale * 500}px`,
                        height: `${scale * 700}px`,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      <Page
                        pageNumber={index + 1}
                        scale={scale}
                        rotate={rotatedPages[index + 1] || 0}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        onClick={() => handleRotatePage(index + 1)}
                        style={{
                          // transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
                          // transform: `rotate(90deg)`,
                        }}
                      />
                    </div>
                    <div style={{ textAlign: 'center', fontSize: '12px', fontStyle: 'italic' }}>
                      {index + 1}
                    </div>
                    <button
                      onClick={() => handleRotatePage(index + 1)}
                      style={{
                        position: 'absolute',
                        zIndex: '10',
                        top: '4px',
                        right: '4px',
                        backgroundColor: '#ff612f',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '50%',
                        padding: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      <SyncOutlined />
                    </button>
                  </div>
                ))}
              </Document>
            </div>

            {/* Download Button */}
            <button
              onClick={downloadRotatedPDF} 
              style={{
                backgroundColor: '#ff612f', 
                padding: '10px 12px', 
                border: 'none', 
                color: 'white', 
                fontWeight: '500', 
                fontSize: '16px', 
                borderRadius: '4px', 
                marginTop: '20px'
            }}>
              Download
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer 
        style={{ 
          marginTop: '64px', 
          maxWidth: '1280px', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          borderTop: '1px solid #ccc', 
          padding: '64px 32px 32px 32px ', 
          display: 'flex', 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          color: '#4b5563', 
          fontSize: '14px', 
          display: 'grid', 
          gridTemplateColumns: `repeat(3, 1fr)`, 
          gap: '32px', 
          borderColor: 'rgba(17, 24, 39, .1)' 
        }}>
        <>
          <div>
            <img src="./favicon.ico" alt="PDF.ai" style={{ width: '28px' }} />
            <p style={{ marginTop: '32px', fontSize: '14px', lineHeight: '24px', color: '#757575' }}>Chat with any PDF: ask questions, get summaries, find information, and more.</p>
            {/* Social Media Icons */}
            <div style={{ marginTop: '32px', display: 'flex', gap: '20px' }}>
                <i style={{ fontSize: '24px', color: '#bdbdbd' }}><TikTokOutlined /></i>
                <i style={{ fontSize: '24px', color: '#bdbdbd', marginLeft: '10px' }}><InstagramOutlined /></i>
                <i style={{ fontSize: '24px', color: '#bdbdbd', marginLeft: '10px' }}><TwitterOutlined /></i>
                <i style={{ fontSize: '24px', color: '#bdbdbd', marginLeft: '10px' }}><YoutubeFilled /></i>
            </div>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(3, 1fr)`, gap: '32px' }}>
              <div>
                <h3 style={{ margin: '4px 0px', color: '#212121' }}>Products</h3>
                <ul style={{ marginTop: '24px', listStyle: 'none', gap: '24px', display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
                  <li>Use cases</li>
                  <li>Chrome extension</li>
                  <li>API docs</li>
                  <li>Pricing</li>
                  <li>Video tutorials</li>
                  <li>Resources</li>
                  <li>Blog</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h3 style={{ margin: '4px 0px', color: '#212121' }}>We also built</h3>
                <ul style={{ marginTop: '24px', listStyle: 'none', gap: '24px', display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
                  <li>Resume AI Scanner</li>
                  <li>Invoice AI Scanner</li>
                  <li>AI Quiz Generator</li> 
                  <li>QuickyAI</li>  
                  <li>Docsium</li> 
                  <li>PDF GPTs</li>  
                  <li>PDF AI Generator</li>  
                  <li>Other PDF tools</li>
                </ul>
              </div>
              <div>
                <h3 style={{ margin: '4px 0px', color: '#212121' }}>Company</h3>
                <ul style={{ marginTop: '24px', listStyle: 'none', gap: '24px', display: 'flex', flexDirection: 'column', marginBottom: '24px'  }}>
                  <li>PDF.ai vs ChatPDF</li>
                  <li>PDF.ai vs Acrobat Reader</li>
                  <li>Legal</li>
                  <li>Affiliate program</li>
                  <li>Investor</li>
                </ul>
              </div>
            </div>
          </div> 
        </>
      </footer>
    </div>
  );
}

