const statuses = [
  {
    id: '1',
    name: 'Test status 1'
  },
  {
    id: '2',
    name: 'Test status 2'
  },
  {
    id: '3',
    name: 'Test status 3'
  }
];

const getAll = () => {
  return Promise.resolve(statuses);
};

export default {
  statuses,
  getAll
};