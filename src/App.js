import React, { Suspense, useEffect } from 'react';
// import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []);

  // 🔹 Vérification si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          {/* Page de connexion accessible à tout le monde */}
          <Route exact path="/login" element={<Login />} />

          {/* Routes protégées - Redirige vers login si pas authentifié */}
          <Route path="*" element={isAuthenticated ? <DefaultLayout /> : <Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
