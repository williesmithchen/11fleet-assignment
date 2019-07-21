import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const Marker = (props) => {
  const style = { backgroundColor: "green" };
  const isOpen = (start, end) => {
    const date = new Date();
    const currentTime = (date.getHours() * 100) + date.getMinutes();
    return (currentTime >= start && currentTime <= end);
  };
  return (
    <Badge color="secondary" badgeContent={isOpen(props.start, props.end) ? "Open" : "Closed"} invisible={false}>
      <Chip
        avatar={<Avatar src={props.imgUrl} />}
        label={props.label}
        clickable
        color="primary"
        lat={props.lat}
        lng={props.lng}
        onClick={() => props.onMarkerClick(props.id)}
        style={props.selected && props.selected.id === props.id ? style : null}
      />
    </Badge>
  );
}

export default Marker;
