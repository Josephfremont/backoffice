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
      const response = await axios.get(`http://127.0.0.1:5500/api/tweet/getTweetCountByDay/${nDay}/${nRange}`);
      return response.data; // Renvoie les données JSON
    } catch (error) {
      console.error("Erreur dans getTweetCountByDay:", error);
      return null; // Renvoie null en cas d'erreur
    }
};


export default getTweetCountByDay