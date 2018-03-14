import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from 'material-ui/List';

import ReorderableListItem from './ReorderableListItem';
import ItemTypes from './ItemTypes';

const cardTarget = {
	drop(props) {
    props.onDrop(props.items);
  },
};

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
class ReorderableList extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);

		this.moveListItem = this.moveListItem.bind(this);
		this.findListItem = this.findListItem.bind(this);

    this.state = {
      listItems: props.items ? props.items.slice() : [],
    };
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.state.listItems) {
      this.setState({ listItems: nextProps.items });
    }
  }

	moveListItem(id, atIndex) {
		const { card, index } = this.findListItem(id);
    const { listItems } = this.state;

    listItems.splice(index, 1); // Remove the moving item.
    listItems.splice(atIndex, 0, card); // Add it back in the proper location

    this.setState({
      ...this.state,
			listItems
		});
	}

	findListItem(id) {
		const { listItems } = this.state;
		const card = listItems.filter(c => c.id === id)[0];

		return {
			card,
			index: listItems.indexOf(card),
		};
	}

	render() {
		const { onDrop, onClickDone, connectDropTarget } = this.props;
		const { listItems } = this.state;

		return connectDropTarget(<div>
			<List>
        {listItems.map(item => (
          <ReorderableListItem
            id={item.id}
            key={item.id}
            item={item}
            onDrop={onDrop}
            onClickDone={onClickDone}
            moveListItem={this.moveListItem}
            findListItem={this.findListItem}
          />
        ))}
			</List>
    </div>);
	}
}

export default ReorderableList;
