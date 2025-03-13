import React, { useEffect, useState } from 'react'
import { 
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CFormInput
} from '@coreui/react'
import { CSpinner, CButton } from '@coreui/react'
import { cilTrash, cilSearch } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import getUsersPlus from '/src/api/getUsersPlus'
import deleteUser from '/src/api/deleteUser' // 🔹 Import de la suppression via Axios

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 10;

  // 🔹 Récupération des utilisateurs
  const fetchUsers = async () => {
    console.log("Appel API getUsersPlus...");
    try {
      const data = await getUsersPlus(); 
      console.log("Réponse API :", data);
      
      if (!data) {
        console.error("Aucune donnée reçue !");
        return;
      }
  
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      setUsers([]);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Suppression d'un utilisateur avec confirmation et mise à jour
  const handleDelete = async (userId, username) => {
    const isConfirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ${username} ?`);
    
    if (isConfirmed) {
      const result = await deleteUser(userId); 
      if (result) {
        setUsers(users.filter(user => user._id !== userId)); 
      }
    }
  };

  // 🔹 Filtrage des utilisateurs selon la recherche
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Pagination des utilisateurs filtrés
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // 🔹 Gestion des pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const handlePrevious = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Utilisateurs</span>
        {/* 🔹 Barre de recherche */}
        <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
          <CIcon icon={cilSearch} className="me-2" />
          <CFormInput 
            type="text" 
            placeholder="Rechercher un utilisateur..." 
            value={searchQuery}
            onChange={handleSearch} 
          />
        </div>
      </CCardHeader>
      <CCardBody>
        {/* 🔹 Affichage du spinner en cas de chargement initial */}
        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <CSpinner color="primary" />
          </div>
        ) : filteredUsers.length === 0 ? ( 
          // ✅ Si aucun utilisateur trouvé, on affiche un message
          <div className="text-center py-5">
            <h5>Aucun utilisateur trouvé.</h5>
          </div>
        ) : (
          <>
            <CTable>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Username</CTableHeaderCell>
                  <CTableHeaderCell scope="col">email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Bio</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Administrateur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Followers</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date de création</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Option</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentUsers.map((user) => (
                  <CTableRow key={user._id}>
                    <CTableDataCell>{user.username}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.bio || "Aucune bio"}</CTableDataCell>
                    <CTableDataCell>{user.admin ? "Oui" : "Non"}</CTableDataCell>
                    <CTableDataCell>{user.followers.length}</CTableDataCell>
                    <CTableDataCell>{new Date(user.createdAt).toLocaleDateString("fr-FR")}</CTableDataCell>
                    <CTableDataCell>
                      <CButton 
                        color="danger" 
                        variant="outline" 
                        size="sm" 
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(user._id, user.username)}
                      >
                        <CIcon icon={cilTrash} className="me-2" />
                        Supprimer
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            {/* 🔹 Pagination */}
            <CPagination align="center" className="mt-3">
              <CPaginationItem 
                disabled={currentPage === 1} 
                onClick={handlePrevious}
                style={{ cursor: currentPage > 1 ? "pointer" : "default" }}
              >
                Précédent
              </CPaginationItem>
              
              {[...Array(totalPages)].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={currentPage === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={{ cursor: "pointer" }}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem 
                disabled={currentPage === totalPages} 
                onClick={handleNext}
                style={{ cursor: currentPage < totalPages ? "pointer" : "default" }}
              >
                Suivant
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  );
}

export default Users;
