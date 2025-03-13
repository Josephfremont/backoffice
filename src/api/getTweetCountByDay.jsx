import axios from 'axios';

// const getTweetCountByDay = (nDay = 0) => {

//     axios.get('http://127.0.0.1:5500/api/tweet/getTweetCountByDay/'+nDay)
//     .then(function (response) {
//     console.log(response);
//     })
//     .catch(function (error) {
//     console.log(error);
//     });

// }

const getTweetCountByDay = async (nDay,nRange) => {
    try {

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user ? user._id : null;

      if (!userId) {
        console.error("❌ Erreur: Aucun ID utilisateur trouvé dans localStorage.");
        return null;
      }

      const response = await axios.get(`http://127.0.0.1:5500/api/tweet/getTweetCountByDay/${nDay}/${nRange}/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      return response.data; // Renvoie les données JSON
    } catch (error) {
      console.error("Erreur dans getTweetCountByDay:", error);
      return null; // Renvoie null en cas d'erreur
    }
};


export default getTweetCountByDay