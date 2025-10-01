import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { SalesSummary } from '../types';
import { format } from 'date-fns';
import { formatCurrency } from './formatCurrency';

export const generateSalesSummaryPDF = (
  summary: SalesSummary,
  startDate?: string,
  endDate?: string
): void => {
  const doc = new jsPDF();
  const currentDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
  const dateRange = startDate && endDate 
    ? `${startDate} to ${endDate}` 
    : 'All time';

  // Add title
  doc.setFontSize(20);
  doc.text('Sales Summary Report', 105, 15, { align: 'center' });
  
  // Add date information
  doc.setFontSize(10);
  doc.text(`Generated on: ${currentDate}`, 105, 22, { align: 'center' });
  doc.text(`Date Range: ${dateRange}`, 105, 27, { align: 'center' });
  
  // Add summary statistics
  doc.setFontSize(12);
  doc.text('Summary Statistics', 14, 40);
  
  autoTable(doc, {
    startY: 45,
    head: [['Metric', 'Value']],
    body: [
      ['Total Sales', summary.totalSales.toString()],
      ['Total Revenue', formatCurrency(summary.totalRevenue)],
      ['Average Order Value', formatCurrency(summary.averageOrderValue)]
    ],
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  // Add top selling items
  doc.text('Top Selling Items', 14, doc.lastAutoTable.finalY + 15);
  
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Product', 'Quantity Sold', 'Revenue']],
    body: summary.topSellingItems.map(item => [
      item.name,
      item.quantity.toString(),
      formatCurrency(item.revenue)
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  // Add sales by category
  doc.text('Sales by Category', 14, doc.lastAutoTable.finalY + 15);
  
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [['Category', 'Items Sold', 'Revenue']],
    body: summary.salesByCategory.map(cat => [
      cat.category,
      cat.count.toString(),
      formatCurrency(cat.revenue)
    ]),
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185] }
  });
  
  // Add footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      'Clothing Shop POS - Confidential',
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Save the PDF
  doc.save(`sales-summary-${currentDate.replace(/[: ]/g, '-')}.pdf`);
};