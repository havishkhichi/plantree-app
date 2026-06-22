'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { TrendDataPoint } from '@/lib/types';

interface TrendChartProps {
  data: TrendDataPoint[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
        <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
        <Tooltip
          contentStyle={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 8,
            fontSize: 12,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line type="monotone" dataKey="heat" stroke="#ef4444" strokeWidth={2} dot={false} name="Heat" />
        <Line type="monotone" dataKey="ndvi" stroke="#22c55e" strokeWidth={2} dot={false} name="NDVI" />
        <Line type="monotone" dataKey="gdi"  stroke="#f59e0b" strokeWidth={2} dot={false} name="GDI"  />
      </LineChart>
    </ResponsiveContainer>
  );
}
