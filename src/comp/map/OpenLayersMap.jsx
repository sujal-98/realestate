import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat, toLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import Overlay from 'ol/Overlay';

const OpenLayersMap = ({ onLocationChange = () => {} }) => {
  const mapRef = useRef(null);
  const popupRef = useRef();
  const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 });

  useEffect(() => {
    if (!mapRef.current) return;

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([coordinates.lng, coordinates.lat]))
    });

    iconFeature.setStyle(
      new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'https://cdn.jsdelivr.net/npm/leaflet@1.9.3/dist/images/marker-icon.png',
          scale: 1
        })
      })
    );

    const vectorSource = new VectorSource({
      features: [iconFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const view = new View({
      center: fromLonLat([coordinates.lng, coordinates.lat]),
      zoom: 15
    });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer
      ],
      view
    });

    const overlay = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10]
    });

    mapInstance.addOverlay(overlay);

    mapInstance.on('click', (event) => {
      const clickedCoord = event.coordinate;
      const [lon, lat] = toLonLat(clickedCoord);

      iconFeature.getGeometry().setCoordinates(clickedCoord);
      
      setCoordinates({ lat, lng: lon });
      onLocationChange(lat, lon);
    });

    // Initial call
    onLocationChange(coordinates.lat, coordinates.lng);

    return () => mapInstance.setTarget(null);
  }, []);

  return (
    <div className="space-y-4">
      <div ref={mapRef} className="h-96 w-full rounded-lg border shadow-md relative" />
      <div ref={popupRef} className="absolute z-10 bg-white p-2 rounded shadow-md text-sm">
        <p><strong>Lat:</strong> {coordinates.lat.toFixed(6)}</p>
        <p><strong>Lng:</strong> {coordinates.lng.toFixed(6)}</p>
      </div>
    </div>
  );
};

export default OpenLayersMap;
