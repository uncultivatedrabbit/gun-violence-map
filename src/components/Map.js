import React, { useState } from "react";
import DeckGL, { MapController } from "deck.gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import sourceData from "../data/gundata.json";
import { StaticMap } from "react-map-gl";

export default function Map(props) {
  const [viewState, setViewState] = useState({
    longitude: -71.0589,
    latitude: 42.36201,
    zoom: 12,
    width: "100vw",
    height: "100vh",
    bearing: 0,
    pitch: 0,
  });
  const [coordsPosition, setCoordsPosition] = useState({ lat: 0, lng: 0 });
  const [pointerX, setPointerX] = useState()
  const [pointerY, setPointerY] = useState()
  const [hoveredObj, setHoveredObj] = useState()

  const handleHover = e => {
    if (e.lngLat === undefined) {
      setCoordsPosition({ lat: 0, lng: 0 });
    } else {
      setCoordsPosition({
        lat: +e.lngLat[1].toFixed(4),
        lng: +e.lngLat[0].toFixed(4),
      });
    }
  };

  const layers = new ScatterplotLayer({
    id: "scatter",
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d =>
      d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
    pickable: true,
    onHover: info => {
      setPointerX(info.x)
      setPointerY(info.y)
      setHoveredObj(info.object)
    }
  });

  const renderTooltip = () => {
    return hoveredObj && (
      <div style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY}}>
        { hoveredObj.latitude}
      </div>
    );
  }

  const getCursor = () => {
    return hoveredObj ? 'pointer' : 'crosshair';
  }


  return (
    <React.Fragment>
      <DeckGL
        viewState={viewState}
        onViewStateChange={viewState => setViewState(viewState.viewState)}
        controller={MapController} // allows the user to move the map around
        layers={layers}
        onHover={handleHover}
        onClick={() => console.log("clicked")}
        getCursor={getCursor}>
        <StaticMap
          mapStyle="mapbox://styles/uncultivatedrabbit/ck5k5kil409wy1ipr5d7e8pwi"
          mapboxApiAccessToken="pk.eyJ1IjoidW5jdWx0aXZhdGVkcmFiYml0IiwiYSI6ImNrNWs1YXJ0YjBha2IzanF4YmhmcHR2ZTUifQ.3YhMGRpoosV0u46J39b3lQ"
        />
        {renderTooltip()}
      </DeckGL>
    </React.Fragment>
  );
}
