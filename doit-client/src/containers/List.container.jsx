import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import AddIcon from 'material-ui-icons/Add';

import { actions, selectors } from 'modules/todos';
import FabButtonRight from 'components/FabButtonRight';
import AddNew from 'components/AddNew';
import { ReorderableList } from 'components/ReorderableList';

const Container = styled.div.attrs({ className: 'container' })`
  margin: 24px auto !important;
`;

const FabButtonHolder = styled.div`
  min-height: 80px;
`

const StyledPaper = styled(Paper)`
  position: relative;
  min-height: 120px;
`

class List extends PureComponent {
  state = {
    task: '',
    priority: 1,
    taskError: false,
    isAddNew: false,
    dueDate: moment().format('YYYY-MM-DD'),
  }

  clearState = {
    task: '',
    dueDate: moment().format('YYYY-MM-DD'),
    priority: 1,
    isAddNew: false,
  }

  componentWillMount() {
    this.props.fetchTodos();
  }

  onClickDone = (id, flipValue) => {
    this.props.completeTodo(id, flipValue);
  }

  onDrop = (items) => {
    items = items.map((item, i) => ({
      id: item.id,
      sortOrder: i,
    }));

    this.props.reorderTodos(items);
  }

  onAddNew = () => {
    this.setState({ isAddNew: true });
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  changeTask = e => {
    this.setState({ task: e.target.value, taskError: !e.target.value });
  }

  handleCancel = () => {
    this.setState(this.clearState);
  }

  handleSubmit = e => {
    e.preventDefault();
    const { task, dueDate, priority } = this.state;
    const { addTodo } = this.props;

    if (!task) {
      this.setState({ taskError: true });
      return false;
    }

    addTodo(task, dueDate, priority);
    this.setState(this.clearState);
  }

  render() {
    const { isAddNew, task, taskError, dueDate, priority } = this.state;
    const { items } = this.props;

    return (
      <Container>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <StyledPaper>
              <ReorderableList items={items} onDrop={this.onDrop} onClickDone={this.onClickDone} />

              {isAddNew ? (
                <AddNew
                  task={task}
                  taskError={taskError}
                  changeTask={this.changeTask}
                  priority={priority}
                  dueDate={dueDate}
                  changePriority={this.handleChange}
                  changeDueDate={this.handleChange}
                  onCancel={this.handleCancel}
                  onSubmit={this.handleSubmit}
                />
              ) : (
                <FabButtonHolder>
                  <FabButtonRight fab color="primary" aria-label="add" onClick={this.onAddNew}>
                    <AddIcon />
                  </FabButtonRight>
                </FabButtonHolder>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  items: selectors.todos(state)
});

const mapDispatchToProps = dispatch => ({
  fetchTodos() {
    dispatch(actions.fetchTodos());
  },
  addTodo(task, dueDate, priority) {
    dispatch(actions.addTodo({ task, dueDate, priority }));
  },
  completeTodo(id, flipValue) {
    dispatch(actions.completeTodo({ id, flipValue }))
  },
  reorderTodos(items) {
    dispatch(actions.reorderTodos({ items }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
