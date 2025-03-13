import axios from 'axios';

const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user._id : null;

    if (!userId) {
      console.error("❌ Erreur: Aucun ID utilisateur trouvé dans localStorage.");
      return null;
    }

    const response = await axios.delete(`http://127.0.0.1:5500/api/users/${userId}/admin/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`Utilisateur supprimé avec succès:`, response.data);
    return response.data; // Retourne la réponse en cas de succès
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return null; // Retourne null en cas d'erreur
  }
};

export default deleteUser;
