import { Outlet } from 'react-router-dom';
import { PlanetText } from './elements/PlanetText';

const ManageProjects = () => {
  return (
    <div className='py-24 px-4'>
      <PlanetText
        title='Manage Website Projects'
        subtitle='Add or update featured projects displayed on the site.'
      />

      <Outlet />
    </div>
  );
};

export default ManageProjects;
