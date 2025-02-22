import React from 'react';

interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  value: number;
  // footer: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-md h-fit overflow-hidden transition-transform transform hover:-translate-y-1 w-full md:w-[280px] p-4 flex">
      <div className="rounded-lg bg-blue-100 p-2">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-800">{title}</p>
        <p className="font-bold text-gray-400">{value}</p>
        <p className='text-sm text-dark-grey'>
          <span className="text-green-500 text-sm">+3.5%</span> Since last month
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;