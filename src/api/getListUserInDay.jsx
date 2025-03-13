import axios from 'axios';

const getListUserInMonth = async (nMonth,nRange) => {
  try {
    const response = await axios.get(`http://127.0.0.1:5500/api/users/getListUserByDay/${nMonth}/${nRange}`);
    return response.data; // Renvoie les données JSON
  } catch (error) {
    console.error("Erreur dans getListUserInMonth:", error);
    return null; // Renvoie null en cas d'erreur
  }
};

export default getListUserInMonth;
