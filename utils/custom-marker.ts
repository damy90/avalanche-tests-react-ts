import L from "leaflet";
import { DangerRange } from "../src/types/reports";

const icons:L.Icon[] = []
for(let i = 1; i <=5; i++) {
    const icon = L.icon({
        iconUrl: `/src/assets/images/${i}.png`,
        //shadowUrl: 'leaf-shadow.png',
    
        //iconSize:     [38, 95], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        //iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        //popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    icons.push(icon);
}

export default function getDangerMarker(dangerLevel:DangerRange, position:L.LatLng):L.Marker {
    const marker = L.marker(position, {icon: icons[dangerLevel - 1]})
    return marker
}