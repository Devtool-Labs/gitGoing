import React from 'react';
import { render } from 'react-dom';

class RoomTableRow extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <tr>
        <td>{this.props.room.roomNumber}</td>
        <td>{this.props.room.roomName}</td>
        <td>{this.props.room.repoName}</td>
      </tr>
    );
  }
}

export default RoomTableRow