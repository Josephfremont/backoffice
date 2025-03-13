import axios from 'axios';

const getTweetsPlus = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5500/api/tweet/tweetsPlus`);
    console.log('response.data gettweet',response.data)
    return response.data; // Renvoie les données JSON
  } catch (error) {
    console.error("Erreur dans getListUserInMonth:", error);
    return null; // Renvoie null en cas d'erreur
  }
};

export default getTweetsPlus;
