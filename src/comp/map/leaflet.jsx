import React, { useEffect, useRef } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import Overlay from 'ol/Overlay';

const OpenLayersMap = ({ label, items, selectedLocation }) => {
  const mapRef = useRef();
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(null);
  const popupRef = useRef();
  const popupContentRef = useRef();
  
  // Find the currently selected location
  const selectedItem = items.find(item => item.id === selectedLocation);
  
  // Default to Delhi coordinates if no item is selected
  const center = [
    selectedItem ? selectedItem.longitude : 77.2090, 
    selectedItem ? selectedItem.latitude : 28.6139
  ];

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapInstanceRef.current) {
      // Create map instance
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM()
          })
        ],
        view: new View({
          center: fromLonLat(center),
          zoom: 12
        })
      });
      
      // Create popup overlay
      const popupOverlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10]
      });
      
      mapInstanceRef.current.addOverlay(popupOverlay);
      
      // Create vector layer for markers
      const vectorSource = new VectorSource();
      markerLayerRef.current = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'https://openlayers.org/en/latest/examples/data/icon.png'
          })
        })
      });
      
      mapInstanceRef.current.addLayer(markerLayerRef.current);
    }
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);
  
  // Update marker and center map when selected location changes
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedItem || !markerLayerRef.current) return;
    
    const view = mapInstanceRef.current.getView();
    const coordinates = fromLonLat([selectedItem.longitude, selectedItem.latitude]);
    
    // Update view center with animation
    view.animate({
      center: coordinates,
      duration: 1000
    });
    
    // Clear existing markers
    const vectorSource = markerLayerRef.current.getSource();
    vectorSource.clear();
    
    // Add new marker
    const marker = new Feature({
      geometry: new Point(coordinates)
    });
    
    vectorSource.addFeature(marker);
    
    // Update popup content
    if (popupContentRef.current) {
      popupContentRef.current.innerHTML = `
        <div class="p-2 bg-white rounded-lg shadow-md">
          <h3 class="font-bold text-blue-600">${selectedItem.name}</h3>
          <p class="text-sm text-gray-500">${selectedItem.latitude.toFixed(4)}, ${selectedItem.longitude.toFixed(4)}</p>
        </div>
      `;
    }
    
    // Position popup
    const overlays = mapInstanceRef.current.getOverlays().getArray();
    if (overlays.length > 0) {
      overlays[0].setPosition(coordinates);
    }
    
  }, [selectedItem]);
  
  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden shadow-lg">
      <div ref={mapRef} style={{ height: "500px", width: "100%" }} />
      <div ref={popupRef} className="absolute z-10 transform -translate-x-1/2">
        <div ref={popupContentRef} className="popup-content"></div>
      </div>
    </div>
  );
};

export default OpenLayersMap;