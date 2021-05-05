import * as React from 'react';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import "./Map.css"
import icon from "./pickup-icon.png"

const maxBounds = {
    minLongitude: 72.9774635,
    maxLongitude: 72.9716376,
    minLatitude: 18.961482,
    maxLatitude: 19.2459112
}

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
const initialState = {
    viewport: {
        width: 400,
        height: 400,
        latitude: 19.3757727,
        longitude: 72.830575,
        zoom: 12,
        maxBounds: [
            [72.97, 18.96],
            [72.97, 19.24]
        ]
    },
};
type State = typeof initialState;
type Viewport = typeof initialState.viewport;

export default class Map extends React.Component<{}, State> {
    public state: State = initialState;

    public componentDidMount() {
        window.addEventListener('resize', this.resize);
        this.resize();
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }


    public updateViewport = (viewport: Viewport) => {
        // if ( viewport.longitude < maxBounds.minLongitude ) {
        //     viewport.longitude = maxBounds.minLongitude;
        // }
        // else if ( viewport.longitude > maxBounds.maxLongitude ) {
        //     viewport.longitude = maxBounds.maxLongitude;
        // }
        // else if ( viewport.latitude < maxBounds.minLatitude ) {
        //     viewport.latitude = maxBounds.minLatitude;
        // }
        // else if ( viewport.latitude > maxBounds.maxLatitude ) {
        //     viewport.latitude = maxBounds.maxLatitude;
        // }
        // this.setState( {
        //     viewport: { ...this.state.viewport, ...viewport }
        // } );
        this.setState(prevState => ({
            viewport: { ...prevState.viewport, ...viewport },
        }));
    };

    public resize = () => {
        this.setState(prevState => ({
            viewport: {
                ...prevState.viewport,
                height: window.innerHeight,
                width: window.innerWidth,
            },
        }));
    };

    public render() {
        const { viewport } = this.state;
        return (
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                onViewportChange={(v: Viewport) => this.updateViewport(v)}
                container="pickup-dashboard-map"
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <div className="map-navigation-controls">
                    <NavigationControl onViewportChange={this.updateViewport} />
                </div>
                <Marker longitude={72.830575} latitude={19.3757727}>
                    <div style={{ cursor: 'pointer', transform: `translate(${-50 / 2}px,${-50}px)` }}>
                        <img src={icon} height={50}/>
                    </div>
                </Marker>
            </ReactMapGL>
        );
    }
}