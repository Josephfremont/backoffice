import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🔹 Pour la redirection après connexion
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import postLoginAdmin from '/src/api/postLoginAdmin'; // 🔹 Import de l'API de connexion admin

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // 🔹 Pour la redirection

  // 🔹 Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = await postLoginAdmin(email, password); // 🔹 Appel API

    if (data) {
      localStorage.setItem('token', data.token); // 🔹 Stocke le token
      localStorage.setItem('user', JSON.stringify(data.user)); // 🔹 Stocke l'utilisateur

      window.location.href = '/';

      // console.log("✅ Connexion réussie :", data);
      // navigate('/dashboard');
      // return data.token && <Navigate to="/dashboard" replace state={{ from: location }} />
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    <p className="text-body-secondary">Connectez-vous à votre compte</p>
                    {error && <p style={{ color: 'red' }}>{error}</p>} {/* 🔹 Affichage des erreurs */}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={4}>
                        <CButton type="submit" color="primary" className="px-4">
                          Connexion
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
