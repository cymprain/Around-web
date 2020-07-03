import React, {Component} from 'react';
import { Marker, InfoWindow} from 'react-google-maps';
import PropTypes from 'prop-types';
import blueMarkerUrl from '../assets/images/blue-marker.svg';

class AroundMarker extends Component {
    static propTypes = {
        post : PropTypes.object.isRequired
    }

    state = {
        isOpen : false
    }
    onToggleOpen = () => {
        this.setState((prevState) => ({
            isOpen : !prevState.isOpen
        }))
    }
    render() {
        const { location, user, url, message, type} = this.props.post;
        const { lat, lon } = location;
        const isImage = type == 'image'
        const customIcon = isImage ? undefined : {
            url : blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41)
        };

        return (
            <Marker
                position={{ lat, lng : lon}}
                onClick={this.onToggleOpen}
                onMouseOver={isImage ? this.onToggleOpen : undefined}
                onMouseOut={isImage ? undefined : this.onToggleOpen}
                onClick={isImage ? undefined: this.onToggleOpen}
                icon={customIcon}
            >
                {
                    this.state.isOpen ? (
                        <InfoWindow>
                            <div>
                                {isImage
                                    ? <img src={url} alt={message} className="around-marker-image"/>
                                    : <video src={url} controls className="around-marker-video"/>}
                                <p>{`${user}: ${message}`}</p>
                            </div>
                        </InfoWindow>
                    ) : null
                }
            </Marker>
        );
    }
}

export default AroundMarker;