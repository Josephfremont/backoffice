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
import getTweetsPlus from '/src/api/getTweetsPlus'
import deleteTweet from '/src/api/deleteTweet' // 🔹 Import de la suppression via Axios

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const tweetsPerPage = 10;

  // 🔹 Récupération des tweets
  const fetchTweets = async () => {
    console.log("Appel API getTweetsPlus...");
    try {
      const data = await getTweetsPlus(); 
      console.log("Réponse API :", data);
      
      if (!data) {
        console.error("Aucune donnée reçue !");
        return;
      }
  
      setTweets(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tweets:", error);
      setTweets([]);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  // 🔹 Suppression d'un tweet avec confirmation
  const handleDelete = async (tweetId, content) => {
    const isConfirmed = window.confirm(`Êtes-vous sûr de vouloir supprimer ce tweet : "${content}" ?`);
    
    if (isConfirmed) {
      const result = await deleteTweet(tweetId); 
      if (result) {
        setTweets(tweets.filter(tweet => tweet._id !== tweetId)); 
        window.location.reload();
      }
    }
  };

  // 🔹 Filtrage des tweets selon le contenu
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredTweets = tweets.filter(tweet =>
    tweet.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 🔹 Pagination des tweets filtrés
  const indexOfLastTweet = currentPage * tweetsPerPage;
  const indexOfFirstTweet = indexOfLastTweet - tweetsPerPage;
  const currentTweets = filteredTweets.slice(indexOfFirstTweet, indexOfLastTweet);

  // 🔹 Gestion des pages
  const totalPages = Math.ceil(filteredTweets.length / tweetsPerPage);
  const handlePrevious = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <CCard className="mb-4">
      <CCardHeader className="d-flex justify-content-between align-items-center">
        <span>Tweets</span>
        {/* 🔹 Barre de recherche */}
        <div className="d-flex align-items-center" style={{ cursor: "pointer" }}>
          <CIcon icon={cilSearch} className="me-2" />
          <CFormInput 
            type="text" 
            placeholder="Rechercher un tweet..." 
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
        ) : filteredTweets.length === 0 ? ( 
          // ✅ Si aucun tweet trouvé, on affiche un message
          <div className="text-center py-5">
            <h5>Aucun tweet trouvé.</h5>
          </div>
        ) : (
          <>
            <CTable>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col">Contenu</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Auteur</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Likes</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Retweets</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Option</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentTweets.map((tweet) => (
                  <CTableRow key={tweet._id}>
                    <CTableDataCell>{tweet.content}</CTableDataCell>
                    <CTableDataCell>{tweet.author != null ? tweet.author.username : ""}</CTableDataCell>
                    <CTableDataCell>{tweet.likes.length}</CTableDataCell>
                    <CTableDataCell>{tweet.retweets.length}</CTableDataCell>
                    <CTableDataCell>{new Date(tweet.createdAt).toLocaleDateString("fr-FR")}</CTableDataCell>
                    <CTableDataCell>
                      <CButton 
                        color="danger" 
                        variant="outline" 
                        size="sm" 
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(tweet._id, tweet.content)}
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

export default Tweets;
