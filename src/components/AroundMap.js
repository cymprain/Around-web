import React, {Component} from 'react';
import { POS_KEY} from "../constants";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

class NormalAroundMap extends Component {
    render() {
        return (
                <GoogleMap
                    defaultZoom={10}
                    defaultCenter={ { lat: 37, lng: -120}}
                ></GoogleMap>
        );
    }
}
const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
export default AroundMap;