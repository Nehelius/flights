import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import 'ol/ol.css'
import OSM from 'ol/source/OSM'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import {Vector} from 'ol/source'
import VectorLayer from 'ol/layer/Vector'
import View from 'ol/View'
import Select from 'ol/interaction/Select'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

var vectorSource = new Vector();

var map = new Map({
  layers: [
   new TileLayer({
    source: new OSM()
   }),
   new VectorLayer({
     source: vectorSource
   })
  ],
  target: 'map',
  view: new View({
   projection: 'EPSG:4326', //force here
   center: [-8.224454, 39.399872],
   zoom: 4
  })
 });

 var select = new Select();
 map.addInteraction(select);
 
 

const HelloWorld = () => {
  const [selected, setSelected] = useState(null)
    
  useEffect(() => {
    axios.get('/api')
      .then(res => {
        let flightArray = []

        for (const flightID in res.data) {
          const [
            flightNumber, 
            latitude,
            longitude,
            timeStamp,
            altitude,
            aircraftModel,
            groundSpeed,
            heading,
            source,
            registration,
            departureAirportICAO,
            arrivalAirportICAO,
            airline,
            verticalSpeed
          ] = res.data[flightID]
          
          const feature = new Feature({
            geometry: new Point([longitude, latitude]),
            flightNumber, 
            latitude,
            longitude,
            timeStamp,
            altitude,
            aircraftModel,
            groundSpeed,
            heading,
            source,
            registration,
            departureAirportICAO,
            arrivalAirportICAO,
            airline,
            verticalSpeed
          });

          flightArray.push(feature)
        }

        vectorSource.addFeatures(flightArray)
      })
      .catch(error => console.log(error))
  
      select.on('select', function(e) {
        setSelected(e.selected[0] ? e.selected[0].getProperties() : null)
        });
  }, [])

  return (
    <div>
      { selected ?
          <div className="flight-info-modal">
            <div><strong>Flight Number:</strong> {selected.flightNumber}</div>
            <div><strong>Latitude:</strong> {selected.latitude}</div>
            <div><strong>Longitude:</strong> {selected.longitude}</div>
            <div><strong>Timestamp:</strong> {selected.timeStamp} ({new Date(selected.timeStamp).toLocaleDateString('en-GB')}, {new Date(selected.timeStamp).toLocaleTimeString('en-GB')} UTC+0)</div>
            <div><strong>Altitude:</strong> {selected.altitude}</div>
            <div><strong>Aircraft Model:</strong> {selected.aircraftModel}</div>
            <div><strong>Ground Speed:</strong> {selected.groundSpeed}</div>
            <div><strong>Heading:</strong> {selected.heading}</div>
            <div><strong>Source:</strong> {selected.source}</div>
            <div><strong>Registration:</strong> {selected.registration}</div>
            <div><strong>Departure Airport ICAO:</strong> {selected.departureAirportICAO}</div>
            <div><strong>Arrival Airport ICAO:</strong> {selected.arrivalAirportICAO}</div>
            <div><strong>Airline:</strong> {selected.airline}</div>
            <div><strong>Vertical Speed:</strong> {selected.verticalSpeed}</div>
          </div> :
          null }
    </div>
  )
}

ReactDOM.render(<HelloWorld />, document.querySelector('main'))