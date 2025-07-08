import { Outlet } from 'react-router-dom';
import NebulaBackground from './Components/designs/NebulaBackground';
import SpaceBackground from './Components/designs/SpaceBackground';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <section className='relative overflow-x-hidden'>
      <NebulaBackground />
      <SpaceBackground device='desktop' />
      <Navbar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
      <Footer />
    </section>
  );
};

export default App;
