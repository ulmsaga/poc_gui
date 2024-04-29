import { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from './routers';
import ThemeCustomization from 'themes';

function App() {
  return (
    <ThemeCustomization>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </ThemeCustomization>
  );
}

export default App;
