import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.twitch.tv/helix',
  headers: {
    'client-id': 'gp762nuuoqcoxypju8c569th9wz7q5',
    Authorization: 'Bearer hgcsyruyzegupuwu6xkhhnfyvizs93',
  },
});
