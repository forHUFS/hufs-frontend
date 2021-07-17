import { useMediaQuery } from 'react-responsive';

export default function useResponsive(params) {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const Desktop = ({ children }) => {
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    return isMobile ? children : null;
  };
  const Default = ({ children }) => {
    return isNotMobile ? children : null;
  };

  return {
    Mobile: Mobile,
    Desktop: Desktop,
    Tablet: Tablet,
    Default: Default,
    isMobile: isMobile,
  };
}
