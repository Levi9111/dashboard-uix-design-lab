import { createBrowserRouter } from 'react-router-dom';
import App from '../../App';
import Home from '../../Home';
import ManageProjects from '../ManageProjects';
import ManageFaqs from '../ManageFaqs';
import ManageReviews from '../ManageReviews';
import ManageVisualCharts from '../ManageVisualCharts';

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
      },
      {
        path: '/manage-faqs',
        element: <ManageFaqs />,
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
