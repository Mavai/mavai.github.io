import React from 'react';
import { shallow } from 'enzyme';
import { Taskboard } from './Taskboard';
import StatusColumn from './StatusColumn';

describe('<Taskboard />', () => {
  const statuses = [{ id: 1, name: 'Started' }, { id: 2, name: 'Finished' }];
  const tasks = {
    '1': { id: 1, name: 'Test task 1' },
    '2': { id: 2, name: 'Test task 2' }
  };
  const taskboard = {
    '1': ['1', '2'],
    '2': []
  };
  const selectedProject = { id: 1, name: 'Test project' };

  it('renders content correctly when no project is selected', () => {
    const wrapper = shallow(<Taskboard selectedProject={null} />);
    expect(wrapper.find('Placeholder').exists()).toEqual(true);
    expect(wrapper.find('DragonDropContext').exists()).toEqual(false);
  });

  it('has correct amount of columns', () => {
    const wrapper = shallow(
      <Taskboard statuses={statuses} selectedProject={selectedProject} />
    );
    expect(wrapper.find('Grid').prop('columns')).toEqual(2);
  });

  it('renders StatusColmn with correct props when it has tasks', () => {
    const wrapper = shallow(
      <Taskboard
        selectedProject={selectedProject}
        tasks={tasks}
        taskboard={taskboard}
        statuses={statuses}
      />
    );
    const droppable = wrapper.find('Connect(Droppable)').first();
    const statusColumn = shallow(droppable.prop('children')({})).find(
      StatusColumn
    );
    expect(statusColumn.prop('status')).toEqual(statuses[0]);
    expect(statusColumn.prop('tasks')).toEqual(tasks);
    expect(statusColumn.prop('column')).toHaveLength(2);
    expect(statusColumn.prop('column')).toEqual(taskboard['1']);
  });

  it('renders StatusColmn with correct props when it has no tasks', () => {
    const wrapper = shallow(
      <Taskboard
        selectedProject={selectedProject}
        tasks={tasks}
        taskboard={taskboard}
        statuses={statuses}
      />
    );
    const droppable = wrapper.find('Connect(Droppable)').last();
    const statusColumn = shallow(droppable.prop('children')({})).find(
      StatusColumn
    );
    expect(statusColumn.prop('status')).toEqual(statuses[1]);
    expect(statusColumn.prop('column')).toHaveLength(0);
  });

  it('onDragEnd does nothing without destination', () => {
    const mockChangeStatus = jest.fn();
    const wrapper = shallow(
      <Taskboard
        selectedProject={selectedProject}
        tasks={tasks}
        taskboard={taskboard}
        statuses={statuses}
      />
    );
    const result = {
      source: { droppableId: '1', index: 0 }
    };
    wrapper.instance().onDragEnd(result);
    expect(mockChangeStatus.mock.calls).toHaveLength(0);
  });

  it('changeTaskStatus is called with correct parameters when desination exists', () => {
    const mockChangeStatus = jest.fn();
    const wrapper = shallow(
      <Taskboard
        selectedProject={selectedProject}
        tasks={tasks}
        taskboard={taskboard}
        statuses={statuses}
        changeTaskStatus={mockChangeStatus}
      />
    );
    const result = {
      source: { droppableId: '1', index: 0 },
      destination: { droppableId: '2', index: 0 }
    };
    const { droppableId: oldStatus, index: sourceIndex } = result.source;
    const {
      droppableId: newStatus,
      index: destinationIndex
    } = result.destination;
    const boardInfo = { oldStatus, newStatus, sourceIndex, destinationIndex };
    wrapper.instance().onDragEnd(result);
    expect(mockChangeStatus.mock.calls).toHaveLength(1);
    expect(mockChangeStatus.mock.calls[0][0]).toEqual({
      ...tasks['1'],
      status: '2'
    });
    expect(mockChangeStatus.mock.calls[0][1]).toEqual(boardInfo);
  });
});
