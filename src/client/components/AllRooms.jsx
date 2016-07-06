import React from 'react';

export default (props) => {
  return (
     <table>
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Room Name</th>
          <th>Repo Name</th>
        </tr>
      </thead>
      <tbody>
        {props.allRooms.map(function(room, index) {
          return (
            <RoomTableRow room={room} key={index}>{ room.roomName }</RoomTableRow>
          );
        })}
      </tbody>
    </table>
  )
}