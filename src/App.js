import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import TaskBoard from './components/TaskBoard';
import ProjectInfo from './components/ProjectInfo';
import { initTasks } from './operations/taskOperations';
import { initStatuses } from './operations/statusOperations';
import { initProjects } from './operations/projectOperations';
import NewTaskForm from './components/NewTaskForm';
import { selectCurrentProject } from './store';

export class App extends PureComponent {

  componentDidMount = async () => {
    const { initProjects, initStatuses } = this.props;
    await Promise.all([
      initStatuses(),
      initProjects()
    ]);
  }

  componentDidUpdate = () => {
    const { selectedProject } = this.props;
    if (selectedProject) {
      this.props.initTasks(selectedProject.id);
    }
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Container style={{ marginTop: 60 }}>
            <Route
              exact path='/'
              render={() => (<ProjectInfo />)}
            />
            <Route
              exact path='/taskboard'
              render={() => <TaskBoard />}
            />
            <Route
              exact path='/create'
              render={({ history }) => <NewTaskForm history={history} />}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

export default connect(state =>
  ({
    selectedProject: selectCurrentProject(state)
  }),
{ initTasks, initStatuses, initProjects }
)(App);
