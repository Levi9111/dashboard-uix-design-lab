import { ArrowRight } from 'lucide-react';
import Route from './elements/Route';

const ReviewsList = () => {
  return (
    <div>
      ReviewsList
      <Route link='/manage-reviews/'>
        <ArrowRight className='w-5 h-5 rotate-180' />
      </Route>
    </div>
  );
};

export default ReviewsList;
