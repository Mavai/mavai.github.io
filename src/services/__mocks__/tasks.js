const tasks = [
  {
    id: '1',
    name: 'Test tasks 1'
  },
  {
    id: '2',
    name: 'Test tasks 2'
  },
  {
    id: '3',
    name: 'Test tasks 3'
  }
];

const getAll = () => {
  return Promise.resolve(tasks);
};

const getAllFromProject = () => {
  return Promise.resolve(tasks);
};

const createNew = task => {
  return Promise.resolve({ ...task, created: true });
};

const update = async task => {
  return Promise.resolve({ ...task, saved: true });
};

const remove = async task => {
  Promise.resolve({ ...task, deleted: true });
};

export default {
  tasks,
  getAll,
  getAllFromProject,
  createNew,
  update,
  remove
};
