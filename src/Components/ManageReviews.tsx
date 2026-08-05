import { PlanetText } from './elements/PlanetText';
import { Outlet } from 'react-router-dom';

const ManageReviews = () => {
  return (
    <div className='py-24 px-4'>
      <PlanetText
        title='Manage Client Testimonials'
        subtitle='Submit powerful case studies from your clients to showcase your impact.'
      />

      <Outlet />
    </div>
  );
};

export default ManageReviews;
