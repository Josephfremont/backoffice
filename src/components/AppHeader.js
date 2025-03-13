import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // 🔹 useNavigate pour redirection
import { useSelector, useDispatch } from 'react-redux';
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CButton, // 🔹 Bouton CoreUI
  useColorModes,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilMenu,
  cilMoon,
  cilSun,
  cilContrast,
  cilAccountLogout, // 🔹 Icône de déconnexion
} from '@coreui/icons';
import { AppBreadcrumb } from './index';

const AppHeader = () => {
  const headerRef = useRef();
  const navigate = useNavigate(); // 🔹 Hook pour la redirection
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0);
      }
    });
  }, []);

  // 🔹 Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    localStorage.removeItem('user');  // Supprime les infos utilisateur
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        

        <CHeaderNav>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CHeaderNav className="ms-auto">
            {/* 🔹 Bouton de déconnexion */}
            <CButton color="danger" variant="outline" onClick={handleLogout}>
              <CIcon icon={cilAccountLogout} className="me-2" />
            </CButton>
          </CHeaderNav>
          {/* <AppHeaderDropdown /> */}
        </CHeaderNav>
        
        
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
