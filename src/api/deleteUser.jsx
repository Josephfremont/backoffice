import axios from 'axios';

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:5500/api/users/${userId}/admin`);
    console.log(`Utilisateur supprimé avec succès:`, response.data);
    return response.data; // Retourne la réponse en cas de succès
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur:", error);
    return null; // Retourne null en cas d'erreur
  }
};

export default deleteUser;
