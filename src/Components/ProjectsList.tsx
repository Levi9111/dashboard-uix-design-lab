import { ArrowRight } from 'lucide-react';
import Route from './elements/Route';

const ProjectsList = () => {
  return (
    <>
      <div className=''></div>
      <Route link='/manage-projects/'>
        <ArrowRight className='w-5 h-5 rotate-180' />
      </Route>
    </>
  );
};

export default ProjectsList;
