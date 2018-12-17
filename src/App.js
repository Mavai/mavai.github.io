import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Taskboard from './components/Taskboard/Taskboard';
import ProjectInfo from './components/Project/ProjectInfo';
import { initTasks } from './operations/taskOperations';
import { initStatuses } from './operations/statusOperations';
import { initProjects, createProject } from './operations/projectOperations';
import NewTaskForm from './components/Task/NewTaskForm';
import Backlog from './components/Task/Backlog';
import ProjectForm from './components/Project/ProjectForm';
import UserForm from './components/User/UserForm';

export class App extends PureComponent {
  componentDidMount = async () => {
    const { initProjects, initStatuses } = this.props;
    await Promise.all([initStatuses(), initProjects()]);
  };

  projectFormOnSubmit = history => formData => {
    const { createProject } = this.props;
    createProject(formData);
    history.push('/');
  };

  render() {
    return (
      <Router>
        <div style={{ height: '100%' }}>
          <NavBar />
          <Container style={{ paddingTop: 60, height: '100%' }}>
            <Route exact path="/" render={() => <ProjectInfo />} />
            <Route exact path="/backlog" render={() => <Backlog />} />
            <Route exact path="/taskboard" render={() => <Taskboard />} />
            <Route
              exact
              path="/new_project"
              render={({ history }) => (
                <ProjectForm onSubmit={this.projectFormOnSubmit(history)} />
              )}
            />
            <Route
              exact
              path="/create"
              render={({ history }) => <NewTaskForm history={history} />}
            />
            <Route
              exact
              path="/new_user"
              render={({ history }) => <UserForm />}
            />
          </Container>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    selectedProject: state.projects.selected
  }),
  { initTasks, initStatuses, initProjects, createProject }
)(App);
