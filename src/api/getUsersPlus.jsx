import axios from 'axios';

const getUsersPlus = async () => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (!userId) {
      console.error("❌ Erreur: Aucun ID utilisateur trouvé dans localStorage.");
      return null;
    }

    const response = await axios.get(`http://127.0.0.1:5500/api/users/userPlus/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Réponse API getUsersPlus:', response.data);
    return response.data; // 🔹 Renvoie les données JSON
  } catch (error) {
    console.error("❌ Erreur dans getUsersPlus:", error.response?.data || error.message);
    return null; // 🔹 Renvoie null en cas d'erreur
  }
};

export default getUsersPlus;
