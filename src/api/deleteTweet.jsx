import axios from 'axios';

const deleteTweet = async (tweetId) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:5500/api/tweet/${tweetId}/admin`);
    console.log(`Tweet supprimé avec succès:`, response.data);
    return response.data; // Retourne la réponse en cas de succès
  } catch (error) {
    console.error("Erreur lors de la suppression du tweet:", error);
    return null; // Retourne null en cas d'erreur
  }
};

export default deleteTweet;
