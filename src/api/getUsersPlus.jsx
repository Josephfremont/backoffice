import axios from 'axios';

const getUsersPlus = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:5500/api/users/userPlus`);
    console.log('response.data getUsers',response.data)
    return response.data; // Renvoie les données JSON
  } catch (error) {
    console.error("Erreur dans getListUserInMonth:", error);
    return null; // Renvoie null en cas d'erreur
  }
};

export default getUsersPlus;
