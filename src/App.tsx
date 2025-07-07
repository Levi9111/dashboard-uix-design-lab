import NebulaBackground from './Components/designs/NebulaBackground';
import SpaceBackground from './Components/designs/SpaceBackground';

const App = () => {
  return (
    <div className='relative'>
      <NebulaBackground />
      <SpaceBackground device='desktop' />
      UIX Dashboard
    </div>
  );
};

export default App;
