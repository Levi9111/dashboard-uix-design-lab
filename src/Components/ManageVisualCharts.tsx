import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Area,
  AreaChart,
} from 'recharts';
import { PlanetText } from './elements/PlanetText';
import type { ReactNode } from 'react';
import type { TooltipProps } from 'recharts';

interface ReviewStats {
  name: string;
  conversions: number;
  bounce_rate: number;
  satisfaction: number;
}

interface FaqStats {
  month: string;
  faqs: number;
}

interface ProjectCategory {
  name: string;
  value: number;
}

const reviewsStats: ReviewStats[] = [
  { name: 'Max', conversions: 60, bounce_rate: 30, satisfaction: 92 },
  { name: 'Lana', conversions: 33, bounce_rate: 18, satisfaction: 94 },
  { name: 'Sarah', conversions: 42, bounce_rate: 50, satisfaction: 91 },
];

const faqData: FaqStats[] = [
  { month: 'Jan', faqs: 4 },
  { month: 'Feb', faqs: 8 },
  { month: 'Mar', faqs: 12 },
  { month: 'Apr', faqs: 6 },
  { month: 'May', faqs: 10 },
];

const projectPie: ProjectCategory[] = [
  { name: 'AI Automation', value: 4 },
  { name: 'UI/UX Design', value: 6 },
  { name: 'Onboarding Optimization', value: 3 },
];

// Tooltip components
const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl'>
        {payload.map((entry, index) => (
          <div key={index} className='flex items-center gap-2 mb-1'>
            <div
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className='text-white capitalize'>
              {entry.dataKey}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip: React.FC<TooltipProps<number, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl'>
        <div className='flex items-center gap-2'>
          <div
            className='w-4 h-4 rounded-full'
            style={{ backgroundColor: payload[0].color }}
          />
          <span className='text-white font-semibold'>
            {payload[0].name}: {payload[0].value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Chart card wrapper component
interface ChartCardProps {
  children: ReactNode;
  title: string;
  icon: string;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  children,
  title,
  icon,
  className = '',
}) => (
  <div className={`group relative ${className}`}>
    <div className='absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500' />
    <div className='relative bg-gray-900/20 backdrop-blur-xl border border-gray-700/30 rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-gray-600/50'>
      <div className='flex items-center gap-3 mb-8'>
        <span className='text-2xl'>{icon}</span>
        <h2 className='text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent'>
          {title}
        </h2>
      </div>
      <div className='relative'>
        <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl' />
        {children}
      </div>
    </div>
  </div>
);

const ManageVisualCharts: React.FC = () => {
  return (
    <div className='py-24 px-6 md:px-16 space-y-20 text-white min-h-screen'>
      <PlanetText
        title='Visual Representation of All Form Submissions'
        subtitle="Here you'll find charts built from demo data across Projects, FAQs, and Reviews"
      />

      {/* Review Bar Chart */}
      <ChartCard title='Customer Review Analytics' icon='📊'>
        <ResponsiveContainer width='100%' height={400}>
          <BarChart
            data={reviewsStats}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id='conversions' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#6366f1' stopOpacity={0.9} />
                <stop offset='95%' stopColor='#6366f1' stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id='bounce' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#10b981' stopOpacity={0.9} />
                <stop offset='95%' stopColor='#10b981' stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id='satisfaction' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#f59e0b' stopOpacity={0.9} />
                <stop offset='95%' stopColor='#f59e0b' stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#374151'
              opacity={0.3}
            />
            <XAxis
              dataKey='name'
              stroke='#cbd5e1'
              fontSize={12}
              fontWeight={600}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke='#cbd5e1'
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType='circle' />
            <Bar
              dataKey='conversions'
              fill='url(#conversions)'
              radius={[4, 4, 0, 0]}
              name='Conversions'
            />
            <Bar
              dataKey='bounce_rate'
              fill='url(#bounce)'
              radius={[4, 4, 0, 0]}
              name='Bounce Rate'
            />
            <Bar
              dataKey='satisfaction'
              fill='url(#satisfaction)'
              radius={[4, 4, 0, 0]}
              name='Satisfaction'
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Project Pie Chart */}
      <ChartCard title='Project Distribution' icon='📁'>
        <ResponsiveContainer width='100%' height={400}>
          <PieChart>
            <defs>
              <linearGradient id='ai' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#8b5cf6' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#a855f7' stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id='design' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#22d3ee' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#0891b2' stopOpacity={0.7} />
              </linearGradient>
              <linearGradient id='onboarding' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#f43f5e' stopOpacity={0.9} />
                <stop offset='100%' stopColor='#e11d48' stopOpacity={0.7} />
              </linearGradient>
            </defs>
            <Pie
              data={projectPie}
              dataKey='value'
              nameKey='name'
              cx='50%'
              cy='50%'
              outerRadius={120}
              innerRadius={60}
              paddingAngle={5}
              label={({ name, value, percent }) =>
                `${name}: ${value} (${((percent ?? 0) * 100).toFixed(0)}%)`
              }
              labelLine={false}
            >
              <Cell fill='url(#ai)' stroke='#8b5cf6' strokeWidth={2} />
              <Cell fill='url(#design)' stroke='#22d3ee' strokeWidth={2} />
              <Cell fill='url(#onboarding)' stroke='#f43f5e' strokeWidth={2} />
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
            <Legend
              verticalAlign='bottom'
              height={36}
              iconType='circle'
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* FAQ Area Chart */}
      <ChartCard title='FAQ Submissions Trend' icon='📈'>
        <ResponsiveContainer width='100%' height={400}>
          <AreaChart
            data={faqData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id='faqGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#ec4899' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#ec4899' stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              stroke='#374151'
              opacity={0.3}
            />
            <XAxis
              dataKey='month'
              stroke='#cbd5e1'
              fontSize={12}
              fontWeight={600}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke='#cbd5e1'
              fontSize={12}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type='monotone'
              dataKey='faqs'
              stroke='#ec4899'
              strokeWidth={3}
              fill='url(#faqGradient)'
              name='FAQ Submissions'
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 text-center'>
          <div className='text-4xl mb-2'>⚡</div>
          <div className='text-2xl font-bold text-blue-400'>127</div>
          <div className='text-gray-400'>Total Submissions</div>
        </div>
        <div className='bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 text-center'>
          <div className='text-4xl mb-2'>📊</div>
          <div className='text-2xl font-bold text-green-400'>92.3%</div>
          <div className='text-gray-400'>Avg Satisfaction</div>
        </div>
        <div className='bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6 text-center'>
          <div className='text-4xl mb-2'>🚀</div>
          <div className='text-2xl font-bold text-orange-400'>45.2%</div>
          <div className='text-gray-400'>Conversion Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ManageVisualCharts;
