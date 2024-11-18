
import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileViewer = ({ file, content }) => {
  const [numPages, setNumPages] = useState(null);

  const renderContent = () => {
    switch (file.type) {
      case 'pdf':
        return (
          <Document
            file={content}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            className="pdf-document"
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page 
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="pdf-page"
                width={window.innerWidth * 0.6}
              />
            ))}
          </Document>
        );

      case 'code':
        return (
          <SyntaxHighlighter 
            language={file.language || 'javascript'}
            style={vs2015}
            className="code-viewer"
          >
            {content}
          </SyntaxHighlighter>
        );

      case 'text':
      default:
        return (
          <div className="text-viewer"></div>
            {content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="file-viewer"></div>
      {renderContent()}
    </div>
  );
};

export default FileViewer;