import L, { LatLng } from "leaflet";
import { useEffect, useRef } from "react"
import {StyledMap} from '../styles/common/Map.styled.jsx';
import { useTestsList } from "../hooks/useTestsList.js";
import getDangerMarker from "../../utils/custom-marker.js";
import { MapProps, TestsListContext } from "../types/reports.js";

let map: L.Map;
 
function Map(props:MapProps) {
    const {className, setMyPosition} = {...props};
    const { tests } = useTestsList()
    const mapRef = useRef<HTMLDivElement>(null);
    const marker: L.Marker = L.marker({lat:0, lng:0}, { draggable: true });

    useEffect(()=> {
        function handleLocationFound(ev: { latlng: LatLng }) {
            marker.setLatLng(ev.latlng);
            if(setMyPosition) {
                setMyPosition(ev.latlng)
            }
            
            marker.addTo(map)
        }

        function handleDrag() {
            if(setMyPosition) {
                setMyPosition(marker.getLatLng())
            }
        }

        if(!mapRef.current) {
            return
        }

        map = L.map(mapRef.current);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        // find location
        map.locate({setView: true, watch: true, maxZoom: 17});
        map.on('locationfound', handleLocationFound);
        marker.on('drag', handleDrag)
        return () => {
            map.off('locationfound', handleLocationFound);
            marker.off('drag', handleDrag)
            map.off();
            map.remove();
        }
    }, [])
    useEffect(()=>{
        const markers = [];
        for(const test of tests) {
            const pos:L.LatLng = new L.LatLng(test.lat, test.lon);
            const testMarker = getDangerMarker(test.dangerLevel, pos);
            testMarker.addTo(map)
            markers.push(testMarker)
            // TEST
            marker.setLatLng(pos)
        }}, [tests])
    return (
        <StyledMap ref={mapRef} className={className}/>
    ) 
}

export default Map