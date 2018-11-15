import React from 'react';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { connect } from 'react-redux';
import Placeholder from './Placeholder';
import { selectTasksByStatus, selectTasks, selectCurrentProject } from '../store';

export class ProjectInfo extends React.PureComponent {

  render() {
    const { selectedProject, tasksByStatus, tasks } = this.props;
    if (!selectedProject) return (
      <Placeholder />
    );

    const data = tasksByStatus.map(obj => ({
      name: obj.status.name,
      value: obj.tasks.length,
      color: obj.status.color
    }));
    return (
      <div className='project-info'>
        <div style={{ display: 'inline-block' }}>
          <h2>Name: {selectedProject.name}</h2>
          <h3>Total tasks: {tasks.length}</h3>
          {tasksByStatus.map(obj => (
            <h3 className='status-info' key={obj.status.name}>
              {obj.status.name}: {obj.tasks.length}
            </h3>
          ))}
        </div>
        <PieChart width={250} height={250} style={{ float: 'right' }}>
          <Legend />
          <Tooltip />
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color}/>
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

export default connect(state =>
  ({
    tasksByStatus: selectTasksByStatus(state),
    selectedProject: selectCurrentProject(state),
    tasks: selectTasks(state)
  }),
null
)(ProjectInfo);