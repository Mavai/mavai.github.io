const projects = [
  {
    id: '1',
    name: 'Test project 1'
  },
  {
    id: '2',
    name: 'Test project 2'
  },
  {
    id: '3',
    name: 'Test project 3'
  }
];

const getAll = () => {
  return Promise.resolve(projects);
};

export default {
  projects,
  getAll
};