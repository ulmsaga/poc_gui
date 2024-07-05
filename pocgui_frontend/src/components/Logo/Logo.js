// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
  const theme = useTheme();

  return (
    /**
     * if you want to use image instead of svg uncomment following, and comment out <svg> element.
     *
     * <img src={logo} alt="Mantis" width="100" />
     *
     */
    <div style={{ marginLeft: '3px', marginTop: '8px' }}>
      <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Circle 바탕 */}
        <circle cx="16" cy="15" r="15" fill={theme.palette.primary.light} />
        {/* Circle */}
        <circle cx="16" cy="15" r="14" fill={theme.palette.grey[700]} />
        {/* N */}
        <path d="M10 5V24" stroke={theme.palette.primary.dark} strokeWidth="5"/>
        <path d="M10 5L22 24" stroke={theme.palette.primary.dark} strokeWidth="5"/>
        <path d="M22 5V24" stroke={theme.palette.primary.dark} strokeWidth="5"/>
        <defs>
          <linearGradient id="paint0_linear" x1="8.62526" y1="14.0888" x2="5.56709" y2="17.1469" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme.palette.primary.darker} />
            <stop offset="0.9637" stopColor={theme.palette.primary.dark} stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default Logo;
