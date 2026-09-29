import React from 'react';
import { CheckCircle2, CreditCard, Clock, Download } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import PortalLayout from '../components/PortalLayout';
import StatCard from '../components/StatCard';

// "Rs. 1,000" -> 1000
const toNumber = (str) => Number(String(str).replace(/[^\d]/g, '')) || 0;
const formatRs = (n) => `Rs. ${n.toLocaleString('en-US')}`;

const esc = (v) =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function downloadVoucher(fee, student) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(fee.voucherId)}</title>
<style>body{font-family:system-ui,sans-serif;max-width:560px;margin:40px auto;padding:24px;border:1px solid #ddd;border-radius:12px}
h1{color:#1e4886;margin:0 0 4px}table{width:100%;border-collapse:collapse;margin-top:16px}
td{padding:8px 0;border-bottom:1px solid #eee}td:first-child{color:#666;width:40%}</style></head>
<body><h1>SMIT Fee Voucher</h1><p>Saylani Mass IT Training</p>
<table>
<tr><td>Voucher ID</td><td><b>${esc(fee.voucherId)}</b></td></tr>
<tr><td>Student</td><td>${esc(student.name)}</td></tr>
<tr><td>Roll Number</td><td>${esc(student.rollNumber)}</td></tr>
<tr><td>Course</td><td>${esc(student.courseName)}</td></tr>
<tr><td>Month</td><td>${esc(fee.month)}</td></tr>
<tr><td>Type</td><td>${esc(fee.type)}</td></tr>
<tr><td>Amount</td><td>${esc(fee.amount)}</td></tr>
<tr><td>Due Date</td><td>${esc(fee.dueDate)}</td></tr>
<tr><td>Status</td><td><b>${esc(fee.status)}</b></td></tr>
</table></body></html>`;
  const url = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fee.voucherId}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function PaymentPage({ onNavigate, onBackToCourses }) {
  const { student } = useStudent();
  const feeRecords = student.feeRecords || [];

  const totalPaid = feeRecords
    .filter((f) => f.status === 'Paid')
    .reduce((sum, f) => sum + toNumber(f.amount), 0);
  const outstanding = feeRecords
    .filter((f) => f.status !== 'Paid')
    .reduce((sum, f) => sum + toNumber(f.amount), 0);

  return (
    <PortalLayout active="payment" crumb="Payment" onNavigate={onNavigate} onBackToCourses={onBackToCourses}>
      <div className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 sm:gap-4">
          <StatCard value={formatRs(totalPaid)} label="Total Paid" icon={CheckCircle2} tone="green" />
          <StatCard value={formatRs(outstanding)} label="Outstanding Due" icon={CreditCard} tone="blue" />
          <StatCard value={student.nextDueDate} label="Next Due Date" icon={Clock} tone="amber" />
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h4 className="text-sm font-bold text-gray-800">Fee History & Vouchers</h4>
            <span className="text-xs text-gray-400">All fees verified by SMIT Accounts</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[640px]">
              <thead className="bg-gray-50/60 text-gray-400 font-medium border-b border-gray-100">
                <tr>
                  {['Month', 'Amount', 'Type', 'Due Date', 'Voucher ID', 'Status'].map((h) => (
                    <th key={h} className="py-3 px-4 sm:px-6 whitespace-nowrap">{h}</th>
                  ))}
                  <th className="py-3 px-4 sm:px-6 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-600">
                {feeRecords.map((fee) => (
                  <tr key={fee.voucherId} className="hover:bg-gray-50/50 transition">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-800 whitespace-nowrap">{fee.month}</td>
                    <td className="py-3.5 px-4 sm:px-6 font-semibold whitespace-nowrap">{fee.amount}</td>
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">{fee.type}</td>
                    <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">{fee.dueDate}</td>
                    <td className="py-3.5 px-4 sm:px-6 text-blue-600 font-mono whitespace-nowrap">{fee.voucherId}</td>
                    <td className="py-3.5 px-4 sm:px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                          fee.status === 'Paid'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-amber-50 text-amber-600 border-amber-200'
                        }`}
                      >
                        {fee.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-center">
                      <button
                        onClick={() => downloadVoucher(fee, student)}
                        className="p-1.5 text-gray-400 hover:text-smit-blue hover:bg-gray-100 rounded transition"
                        title="Download Voucher"
                        aria-label={`Download voucher ${fee.voucherId}`}
                      >
                        <Download size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
