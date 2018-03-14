import React from 'react';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import IconDone from 'material-ui-icons/Done';

import FabButtonRight from './FabButtonRight';

const Form = styled.form`
  padding: 3px 120px 16px 16px;
`;

const StyledFormControl = styled(FormControl)`
  && {
    min-width: 160px;
    margin: 1px 16px 0 0;
  }
`

const CancelButton = styled(Button)`
  && {
    position: absolute;
    right: 90px;
    bottom: 24px;
  }
`;

const AddNew = ({
  priority = '',
  changePriority,
  changeTask,
  changeDueDate,
  dueDate,
  task,
  taskError,
  onCancel,
  onSubmit
}) => (
  <Form autoComplete="off" onSubmit={onSubmit}>
    <TextField
      id="task"
      label="Task"
      error={taskError}
      value={task}
      onChange={changeTask}
      helperText={taskError ? 'Required! Or how else will you know what to do?' : 'Enter it here and get it done!'}
      margin="normal"
      fullWidth
    />

    <StyledFormControl>
      <InputLabel htmlFor="priority">Priority</InputLabel>
      <Select
        id="priority"
        name="priority"
        value={priority}
        onChange={changePriority}
      >
        <MenuItem value={0}>Low</MenuItem>
        <MenuItem value={1}>Normal</MenuItem>
        <MenuItem value={2}>High</MenuItem>
      </Select>
    </StyledFormControl>

    <TextField
      id="dueDate"
      name="dueDate"
      label="Due Date"
      type="date"
      value={dueDate}
      onChange={changeDueDate}
      InputLabelProps={{
        shrink: true,
      }}
    />

    <CancelButton onClick={onCancel}>Cancel</CancelButton>
    <FabButtonRight type="submit" color="accent">
      <IconDone />
    </FabButtonRight>
  </Form>
);

export default AddNew;
