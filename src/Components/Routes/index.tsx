import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Home from '../../Home';
import ManageProjects from '../ManageProjects';
import ManageFaqs from '../ManageFaqs';
import ManageReviews from '../ManageReviews';
import ManageVisualCharts from '../ManageVisualCharts';
import FaqList from '../FaqList';
import CreateFaq from '../CreateFaq';
import CreateProject from '../CreateProject';
import ProjectsList from '../ProjectsList';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/manage-projects',
        element: <ManageProjects />,
        children: [
          {
            path: '',
            element: <CreateProject />,
          },
          {
            path: 'all-projects',
            element: <ProjectsList />,
          },
        ],
      },
      {
        path: '/manage-faqs',
        element: <ManageFaqs />,
        children: [
          {
            path: '',
            element: <CreateFaq />,
          },
          {
            path: 'all-faqs',
            element: <FaqList />,
          },
        ],
      },
      {
        path: '/manage-reviews',
        element: <ManageReviews />,
      },
      {
        path: '/visuals',
        element: <ManageVisualCharts />,
      },
    ],
  },
]);
