// material-ui
import { styled } from '@mui/material/styles';
import LoadingLayer from './layer/LoadingLayer';
// import { CircularProgress } from '@mui/material';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2001,
  width: '100%',
  '& > * + *': {
    marginTop: theme.spacing(2)
  }
}));

// ==============================|| Loader ||============================== //

const Loader = () => (
  <LoaderWrapper>
    {/* <CircularProgress color="primary" /> */}
    <LoadingLayer isLoading={true} />
  </LoaderWrapper>
);

export default Loader;
