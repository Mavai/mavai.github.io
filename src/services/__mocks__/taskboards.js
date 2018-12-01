const taskboards = [
  {
    id: '1',
    name: 'My taskboard'
  }
];

const getOne = (id) => {
  return Promise.resolve(taskboards.find(taskboard => taskboard.id === id));
};

const createNew = taskboard => {
  return Promise.resolve({ ...taskboard, created: true });
};

const update = async taskboard => {
  return Promise.resolve({ ...taskboard, saved: true });
};

const remove = async taskboard => {
  Promise.resolve({ ...taskboard, deleted: true });
};

export default {
  taskboards,
  getOne,
  createNew,
  update,
  remove
};