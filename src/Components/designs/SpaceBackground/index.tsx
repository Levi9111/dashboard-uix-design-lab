import MobileSpaceBackground from './MobileSpaceBackground';
import TabAndDesktopSpaceBackground from './TabAndDesktopSpaceBackground';

const SpaceBackground = ({ device = 'mobile' }: { device?: string }) => {
  return (
    <>
      {device === 'mobile' ? (
        <MobileSpaceBackground />
      ) : (
        <TabAndDesktopSpaceBackground />
      )}
    </>
  );
};

export default SpaceBackground;
