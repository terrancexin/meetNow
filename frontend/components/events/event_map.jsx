import React from 'react';

class EventMap extends React.Component {
  constructor(props) {
    super(props);
    this.markers = [];
  }

  componentDidMount() {
    if (!this.props.latitude) return;
    this.setMapOptions();
    this.pos = new google.maps.LatLng(this.props.latitude,
      this.props.longitude);

    this.addMarker(this.pos);
  }

  setMapOptions() {
    if (this.props.latitude) {
      this.mapOptions = {
      center: { lat: this.props.latitude,
        lng: this.props.longitude },
        zoom: 13
      };
    }
    this.map = new google.maps.Map(this.mapNode, this.mapOptions);
  }

  addMarker(pos) {
    const marker = new google.maps.Marker({
      position: pos,
      map: this.map
    });
    this.markers.push(marker);
  }

  clearMarkers() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }

    this.markers = [];
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.latitude) return;
    this.setMapOptions(nextProps.latitude);
    const pos = new google.maps.LatLng(nextProps.latitude, nextProps.longitude);
    this.clearMarkers();
    this.addMarker(pos);
  }

  render() {
    return (
      <div id="event-map-container" ref={ map => this.mapNode = map }>
      </div>
    );
  }
}

export default EventMap;
