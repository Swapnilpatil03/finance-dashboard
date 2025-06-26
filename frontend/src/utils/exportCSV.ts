// src/utils/exportCSV.ts

export const exportTransactionsToCSV = (transactions: any[], filename = 'transactions.csv') => {
  const headers = ['User ID', 'Date', 'Amount', 'Status'];
  const rows = transactions.map(t => [
    t.user_id,
    new Date(t.date).toLocaleDateString(),
    t.amount,
    t.status
  ]);

  const csv = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
