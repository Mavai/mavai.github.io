import React from 'react';
import { shallow } from 'enzyme';
import { ProjectInfo } from './ProjectInfo';
import Placeholder from '../Placeholder';
import { Cell } from 'recharts';

const project = { name: 'Selected project' };
const tasks = [
  { name: 'Started task 1' },
  { name: 'Started task 2' },
  { name: 'Finished task 1' },
  { name: 'Finished task 2' }
];
const tasksByStatus = [
  {
    status: {
      name: 'Started',
      color: 'cyan'
    },
    tasks: [tasks[0], tasks[1]]
  },
  {
    status: {
      name: 'Finished',
      color: 'green'
    },
    tasks: [tasks[2], tasks[3]]
  }
];

describe.only('<ProjectInfo />', () => {
  it('renders content correctly when no project is selected', () => {
    const wrapper = shallow(<ProjectInfo selectedProject={null} />);
    expect(wrapper.find(Placeholder).exists()).toEqual(true);
    expect(wrapper.find('.project-info').exists()).toEqual(false);
  });

  describe('with selected project', () => {
    let wrapper;
    beforeAll(() => {
      wrapper = shallow(
        <ProjectInfo
          selectedProject={project}
          tasksByStatus={tasksByStatus}
          tasks={tasks}
        />
      );
    });

    it('renders content correctly', () => {
      expect(wrapper.find('.project-info').exists()).toEqual(true);
      expect(wrapper.find(Placeholder).exists()).toEqual(false);
    });

    it('displayed info includes each status', () => {
      const statusInfos = wrapper.find('.status-info').map(row => row.text());
      tasksByStatus.forEach(obj => {
        expect(statusInfos).toContain(
          `${obj.status.name}: ${obj.tasks.length}`
        );
      });
    });

    it('PieChart contains Cell for each status', () => {
      const cells = wrapper.find(Cell);
      expect(cells.length).toEqual(tasksByStatus.length);
      tasksByStatus.forEach(obj => {
        expect(cells.map(cell => cell.prop('fill'))).toContain(
          obj.status.color
        );
      });
    });
  });
});
