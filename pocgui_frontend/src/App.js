import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { useSelector } from 'react-redux';
import AxiosInterceptLayer from 'components/layer/AxiosInterceptLayer';
import LoadingLayer from 'components/layer/LoadingLayer';
import Alert from 'components/alert';

function App() {

  const loading = useSelector((state) => state.loading);
  const isLoadingShow = loading.isShow;

  return (
    <ThemeCustomization>
      <BrowserRouter>
        <ScrollTop>
          <Routers />
        </ScrollTop>
      </BrowserRouter>
      <LoadingLayer isLoading={ isLoadingShow } />
      <AxiosInterceptLayer />
      <Alert />
    </ThemeCustomization>
  );
}

export default App;
