import axios from 'axios';
const baseUrl = 'api/taskboards';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getOne = async id => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createNew = async taskboard => {
  const response = await axios.post(baseUrl, taskboard);
  return response.data;
};

const update = async taskboard => {
  const response = await axios.put(`${baseUrl}/${taskboard.id}`, taskboard);
  return response.data;
};

const remove = async taskboard => {
  const response = await axios.delete(`${baseUrl}/${taskboard.id}`);
  return response.data;
};

export default { getAll, getOne, createNew, update, remove };
