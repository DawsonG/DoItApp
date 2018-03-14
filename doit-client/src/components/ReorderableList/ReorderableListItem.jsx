import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DragSource, DropTarget } from 'react-dnd';
import { ListItem } from 'material-ui/List';
import IconDone from 'material-ui-icons/Done';

import ItemTypes from './ItemTypes';


function priorityColor(props) {
  switch (props.priority) {
    case 0:
      return '#eeeeee';
    case 1:
    default:
      return '#c9c9c9';
    case 2:
      return 'red';
  }
}

const DoneButton = styled.button`
  box-sizing: border-box;
  border-radius: 50%;
  padding: 0;
  min-width: 0;
  width: 24px;
  font-size: 14px;
  height: 24px;
  border-width: 2px;
  margin-right: 16px;

  border-color: ${props => priorityColor(props)};

  .aligner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }
`;

const StyledListItem = styled(ListItem)`
  && {
    align-items: stretch;
  }
`;

const Description = styled.span`
  flex-grow: 2;
  text-decoration: ${props => props.isComplete ? 'line-through' : ''};
`;

const Date = styled.div`
  font-size: 14px;
  color: #c0c0c0;
`;

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findListItem(props.id).index,
		};
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem();
		const didDrop = monitor.didDrop();

		if (!didDrop) {
			props.moveListItem(droppedId, originalIndex);
		}
	},
};

const cardTarget = {
	canDrop() {
		return false;
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem();
		const { id: overId } = props;

		if (draggedId !== overId) {
			const { index: overIndex } = props.findListItem(overId);
			props.moveListItem(draggedId, overIndex);
		}
	},
};

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class ReorderableListItem extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
		item: PropTypes.any.isRequired,
		children: PropTypes.node,
		moveListItem: PropTypes.func.isRequired,
		findListItem: PropTypes.func.isRequired,
    onClickDone: PropTypes.func,
	}

  state = {
    item: this.props.item,
  }

  onClickDone = (itemId) => {
    const { item } = this.state;
    item.isComplete = !item.isComplete;

    this.setState({ item });
    this.props.onClickDone(itemId, item.isComplete);
  }

	render() {
		const {
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props;

    const { item } = this.state;

		const opacity = isDragging ? 0 : 1;

		return connectDragSource(connectDropTarget(<div>
      <StyledListItem style={{ opacity }}>
        <DoneButton priority={item.priority} onClick={() => this.onClickDone(item.id)}>
          {item.isComplete && (<div className="aligner"><IconDone /></div>)}
        </DoneButton>
        <Description isComplete={item.isComplete}>{item.description}</Description>
        <Date>{moment.utc(item.dueDate).format('L')}</Date>
      </StyledListItem>
    </div>));
	}
}

export default ReorderableListItem;
