import L, { LatLng } from "leaflet";
import { useEffect, useRef, useState } from "react"
import {StyledMap} from '../styles/common/Map.styled.jsx';
import { useTestsList } from "../hooks/useTestsList.js";
import getDangerMarker from "../../utils/custom-marker.js";
import { MapProps } from "../types/reports.js";
import { useAuth } from "../hooks/useAuth.js";
import { useFetchTestsQuery } from "../redux/features/tests-api-slice.js";
import { useAppSelector } from "../redux/hooks.js";
//import { useLoginMutation } from "../redux/features/auth/authApiSlice.js";

let map: L.Map;
 
function Map(props:MapProps) {
    const {className, setMyPosition} = {...props};
    const token = useAppSelector((state) => state.auth.token);
    const mapRef = useRef<HTMLDivElement>(null);
    const marker: L.Marker = L.marker({lat:0, lng:0}, { draggable: true });
    const { data = [], isFetching } = useFetchTestsQuery(token)

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
        for(const test of data) {
            let pos:L.LatLng;
            try {
                pos = new L.LatLng(test.lat, test.lon);
            } catch (e) {
                console.error('invalid position')
                continue;
            }
            
            const testMarker = getDangerMarker(test.dangerLevel, pos);
            testMarker.addTo(map)
            markers.push(testMarker)
            // TEST
            marker.setLatLng(pos)
        }}, [data])
    return (
        <StyledMap ref={mapRef} className={className}/>
    ) 
}

export default Map