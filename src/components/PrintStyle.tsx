export function PrintStyle() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @media print {
        /* Hide everything by default */
        body * {
          visibility: hidden;
        }
        
        /* Show only the printable container and its children */
        #printable-area, #printable-area * {
          visibility: visible;
        }
        
        /* Position the printable area at the top-left */
        #printable-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* Hide elements explicitly marked with no-print */
        .no-print, .no-print * {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
      }
    ` }} />
  );
}
