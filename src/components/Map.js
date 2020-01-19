import React from "react";
import DeckGL from "deck.gl";
import { StaticMap } from "react-map-gl";
import {ScatterplotLayer } from '@deck.gl/layers'
import sourceData from '../data/gundata.json'

export default function Map(props){
  const layer = new ScatterplotLayer({
    id: 'scatter',
    data: sourceData,
    opacity: 0.8,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: d => [d.longitude, d.latitude],
    getFillColor: d => d.n_killed > 0 ? [200, 0, 40, 150] : [255, 140, 0, 100],
  });
  return (
<React.Fragment>
   <DeckGL
    initialViewState={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 12
    }}
    height="100%"
    width="100%"
    controller={true} // allows the user to move the map around
    layers={layer}
   >
     <StaticMap
       mapStyle="mapbox://styles/uncultivatedrabbit/ck5k5kil409wy1ipr5d7e8pwi"
       mapboxApiAccessToken="pk.eyJ1IjoidW5jdWx0aXZhdGVkcmFiYml0IiwiYSI6ImNrNWs1YXJ0YjBha2IzanF4YmhmcHR2ZTUifQ.3YhMGRpoosV0u46J39b3lQ"
      />
   </DeckGL>
  </React.Fragment>
    )
}
