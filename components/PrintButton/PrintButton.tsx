const PrintButton = ({
  children,
  printContentId,
  pdfTitle,
}: {
  children: React.ReactNode;
  printContentId: string;
  pdfTitle: string;
}): JSX.Element => {
  const handlePrint = () => {
    const printContent = document.getElementById(printContentId);
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>${pdfTitle}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: sans-serif; }
            .font-semibold { font-weight: bold; }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <button
      onClick={handlePrint}
      className="rounded bg-primary-600 px-3 py-1 text-white hover:bg-primary-700"
    >
      {children}
    </button>
  );
};

export default PrintButton;
