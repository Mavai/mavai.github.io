import axios from 'axios';
const baseUrl = 'api/users';

const createNew = async user => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { createNew };
