import axios from 'axios';
const baseUrl = '/api/projects';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async project => {
  const response = await axios.post(baseUrl, project);
  return response.data;
};

const update = async project => {
  const response = await axios.put(`${baseUrl}/${project.id}`, project);
  return response.data;
};

export default { getAll, update, createNew };
