import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportTransactionsToPDF = (transactions: any[]) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text('Transaction Report', 14, 22);

  const tableColumn = ['Name', 'Date', 'Amount', 'Status'];
  const tableRows: any[] = [];

  transactions.forEach((t) => {
    tableRows.push([
      t.user_id,
      new Date(t.date).toLocaleDateString('en-GB'),
      `$${t.amount.toFixed(2)}`,
      t.status,
    ]);
  });

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: { font: 'helvetica', fontSize: 10 },
    headStyles: { fillColor: [0, 230, 118] }, // green header
  });

  doc.save('transactions_report.pdf');
};
