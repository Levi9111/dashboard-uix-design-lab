import { PlanetText } from './elements/PlanetText';
import { Outlet } from 'react-router-dom';

const ManageFaqs = () => {
  return (
    <div className='relative py-24 px-4'>
      <PlanetText
        title='Manage Frequently Asked Questions'
        subtitle='Add or update questions that help users understand your services better.'
      />

      <Outlet />

      {/* Floating Button */}
    </div>
  );
};

export default ManageFaqs;
