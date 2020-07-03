import React, {Component} from 'react';
import { POS_KEY} from "../constants";
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';
import AroundMarker from "./AroundMarker";

class NormalAroundMap extends Component {
    render() {
        const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY))
        return (
                <GoogleMap
                    ref={this.getMapRef}
                    defaultZoom={10}
                    defaultCenter={ { lat, lng: lon}}
                    onDragEnd={this.reloadMarker}
                    onZoomChanged={this.reloadMarker}
                >
                    {
                        this.props.posts.map(
                            post => <AroundMarker post={post} key={post.url}/>
                        )
                    }
                </GoogleMap>
        );
    }
    getMapRef = (mapInstance) => {
        this.map = mapInstance;
    }
    reloadMarker = () => {
        console.log(1)
        // get location
        const center = this.getCenter()
        // get radius
        const radius = this.getRadius()
        // reload post -> call this.props.loadPostsByTopic
        this.props.loadPostsByTopic(center, radius);
        // c->p
    }

    getCenter = () => {
        const center = this.map.getCenter();
        return {
            lat : center.lat(),
            lon : center.lng()
        }
    }

    getRadius = () => {
        const bounds = this.map.getBounds()
        const center = this.map.getCenter()
        if (center && bounds) {
            const ne = bounds.getNorthEast()
            const right = new window.google.maps.LatLng(center.lat(), ne.lng());
            return 0.001 * window.google.maps.geometry.spherical.computeDistanceBetween(center, right)
        }

    }
}
const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
export default AroundMap;