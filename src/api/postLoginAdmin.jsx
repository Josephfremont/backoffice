import axios from 'axios';

const postLoginAdmin = async (email, password) => {
  try {
    const response = await axios.post('http://127.0.0.1:5500/api/auth/loginAdmin', {
      email,
      password
    });

    console.log("Connexion réussie :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.response?.data || error.message);
    return null;
  }
};

export default postLoginAdmin;
