import React from 'react';

import Tree from './Tree';
import TreeStateModifiers from './state/TreeStateModifiers';
import {UPDATE_TYPE} from './contants';


const UnstableFastTree = ({ nodes, onChange, children, nodeMarginLeft }) => {

  const handleChange = ({node, type, index}) => {
    let nodes;

    if (type === UPDATE_TYPE.UPDATE) {
      nodes = TreeStateModifiers.editNodeAt(nodes, index, node);
    } else {
      nodes = TreeStateModifiers.deleteNodeAt(nodes, index);
    }

    onChange(nodes);
  };

  return (
    <Tree
      nodeMarginLeft={nodeMarginLeft}
      nodes={ nodes }
      onChange={handleChange}
      NodeRenderer={children}
    />
  );
};

export default UnstableFastTree;

/*
export default class UnstableFastTree extends React.Component {
  static contextTypes = {
    unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node)),
  };

  get nodes() {
    return this.context.unfilteredNodes || this.props.nodes;
  }

  handleChange = ({node, type, index}) => {
    let nodes;

    if (type === UPDATE_TYPE.UPDATE) {
      nodes = TreeStateModifiers.editNodeAt(this.props.nodes, index, node);
    } else {
      nodes = TreeStateModifiers.deleteNodeAt(this.props.nodes, index);
    }

    this.props.onChange(nodes);
  };

  render() {
    return (
      <Tree
        nodeMarginLeft={this.props.nodeMarginLeft}
        nodes={this.props.nodes}
        onChange={this.handleChange}
        NodeRenderer={this.props.children}
      />
    );
  }
}

UnstableFastTree.propTypes = {
  extensions: PropTypes.shape({
    updateTypeHandlers: PropTypes.object,
  }),
  nodes: PropTypes.shape({
    flattenedTree: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOf([PropTypes.number, PropTypes.string])))
      .isRequired,
    tree: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  }),
  onChange: PropTypes.func,
  children: PropTypes.func.isRequired,
  nodeMarginLeft: PropTypes.number,
  width: PropTypes.number,
  scrollToId: PropTypes.number,
};

UnstableFastTree.defaultProps = {
  nodeMarginLeft: 30,
};
*/