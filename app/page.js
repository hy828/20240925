"use client";
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './page.module.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

export default function Home() {
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotatedPages, setRotatedPages] = useState({});
  const [numPages, setNumPages] = useState(null);

  const handleFileUpload = (event) => {
    const file = event?.target?.files[0];
    if (file) {
      console.log("Uploaded file:", file);
      setLoading(true);
      setPdfFile(file);
    }
  };

  const handleRotatePage = (pageNumber) => {
    setRotatedPages((prev) => ({
      ...prev,
      [pageNumber]: (prev[pageNumber] || 0) + 90,
    }));
  };

  const handleRemovePDF = () => {
    setPdfFile(null);
    setRotatedPages({});
  };

  const handleZoomIn = () => {
    setScale((prev) => prev + 0.1);
  };

  const handleZoomOut = () => {
    setScale((prev) => (prev > 0.5 ? prev - 0.1 : prev));
  };

  const handlePdfLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const handlePdfLoadError = (error) => {
    console.error('Error loading PDF:', error);
    setLoading(false);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <header style={{ backgroundColor: '#ffffff', padding: '10px', boxShadow: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#000000', margin: 0 }}>PDF.ai</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <p>Pricing</p>
          <p>Chrome extension</p>
          <p>Use cases</p>
          <p>Get started</p>
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Rotate PDF Pages</h2>
        <p>Simply click on a page to rotate it. You can then download your modified PDF.</p>

        {/* Upload Section or PDF Controls */}
        {!pdfFile ? (
          <>
            <label
              htmlFor="pdf-file-input"
            >
              Click to upload or drag and drop
            </label>
            {/* Hidden File Input */}
            <input
              id="pdf-file-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileUpload}
            />
          </>
        ) : (
          <div style={{ marginTop: '20px' }}>
            {/* {loading ? (
              <div>
                <p>Loading...</p>
              </div>
            ) : ( */}
              <>
                {/* Control Buttons */}
                <button onClick={() => handleRotatePage("all")}>Rotate all</button>
                <button onClick={handleRemovePDF}>Remove PDF</button>
                <button onClick={handleZoomIn}>Zoom In</button>
                <button onClick={handleZoomOut}>Zoom Out</button>

                {/* PDF Preview */}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <Document file={pdfFile} onLoadSuccess={handlePdfLoadSuccess} renderMode="canvas" onLoadError={handlePdfLoadError}>
                    {Array.from(new Array(numPages), (el, index) => (
                      <div key={`page_${index + 1}`} style={{ position: 'relative', display: 'inline-block' }}>
                        <Page pageNumber={index + 1} scale={scale} rotate={rotatedPages[index + 1] || 0} />
                        <button onClick={() => handleRotatePage(index + 1)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
                          rotate
                        </button>
                      </div>
                    ))}
                  </Document>
                </div>

                {/* Download Button */}
                <button style={{ marginTop: '20px' }}>Download PDF</button>
              </>
          </div>
        )}

        
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f8f8f8', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
          <div>
          <p>Chat with any PDF: Ask questions, get summaries, find information, and more.</p>
          </div>
          <div>
            <h5>Products</h5>
            <p>Use cases</p>
            <p>Chrome extension</p>
            <p>API docs</p>
            <p>Pricing</p>
            <p>Video tutorials</p>
            <p>Resources</p>
            <p>Blog</p>
            <p>FAQ</p>
          </div>
          <div>
            <h5>We also built</h5>
            <p>Resume AI Scanner</p>
            <p>Invoice AI Scanner</p>
            <p>AI Quiz Generator</p>
            <p>QuickyAI</p>
            <p>Docsium</p>
            <p>PDF GPTs</p>
            <p>PDF AI Generator</p>
            <p>Other PDF tools</p>
          </div>
          <div>
            <h5>Company</h5>
            <p>PDF.ai vs ChatPDF</p>
            <p>PDF.ai vs Acrobat Reader</p>
            <p>Legal</p>
            <p>Affiliate program</p>
            <p>Investor</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

