import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function DownloadButton({ previewRef }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    if (!previewRef.current || isGenerating) return;

    setIsGenerating(true);
    const preview = previewRef.current;
    const canvas = await html2canvas(preview, {
      scale: 1.5, // Reduced from 2 to 1.5 for better file size while maintaining quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0,
      removeContainer: true,
      letterRendering: false,
      allowTaint: true
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Convert canvas to compressed JPEG instead of PNG
    const imgData = canvas.toDataURL('image/jpeg', 0.85); // 0.85 quality provides good balance
    
    // Add image with compression
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    
    // Optimize PDF
    pdf.setProperties({
      title: 'Resume',
      creator: 'Resume Builder',
      producer: 'Resume Builder Pro'
    });

    // Generate filename with date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\//g, '-');
    
    // Save the PDF
    pdf.save(`resume_${date}.pdf`);
    setIsGenerating(false);
  };

  return (
    <div className="fixed bottom-8 right-8 flex gap-4">
      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className={`px-6 py-3 bg-yellow-300 text-black rounded-lg shadow-lg hover:bg-yellow-400 
          transition-all transform hover:scale-105 flex items-center gap-2
          ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating PDF...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </>
        )}
      </button>
    </div>
  );
}
