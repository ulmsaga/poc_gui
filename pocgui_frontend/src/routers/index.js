import { useRoutes } from 'react-router-dom';
import LoginRouter from './LoginRouter';
import MainRouter from './MainRouter';

const Routers = () => {
  return (
    useRoutes([LoginRouter, MainRouter])
  );
};

export default Routers;