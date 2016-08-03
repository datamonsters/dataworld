import './rastercoords'
import {AStream} from "../../common/astream";

export const assetsUrl = (x)=>'/assets/' + x;
export const assetsUrlS = '/assets/';

L.Icon.Default.imagePath = assetsUrl("images");


const minZoom = 3,
    maxZoom = 6,
    img = [
        10000,  // original width of image
        7000//   // original height of image
    ];

const imgDir = "assets/images/";
const redMarker = L.icon(
    {
        iconUrl: imgDir + 'marker-icon-red.png',
        iconRetinaUrl: imgDir + 'marker-icon-red-2x.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [-0, -31],
        shadowUrl: imgDir + 'marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [14, 41]
    }
);

let map, rc, markers
const selectedStream = AStream();
const cords = (c)=> {
    c[1] = parseInt(c[1]) + 1625
    c[0] = parseInt(c[0]) + 2500
    return rc.unproject(c)
}
export const mapModule = {
    selectedPointIndex: selectedStream,
    init: ()=> {
        map = L.map(
            'map', {
                minZoom: 3.5,
                maxZoom: maxZoom,
                trackResize: false,
                boxZoom: false,
                noWarp: true
                //zoomControl: false
            }
        );
        rc = new L.RasterCoords(map, img);
        rc.setMaxBounds();
        map.setView(cords([1764, 764]), 4);
        L.tileLayer(
            'assets/tiles/{z}/{x}/{y}.png', {
                noWrap: true,
                attribution: 'DataWorld </a> by ' +
                '<a href="datamonsters.co">datamonsters</a>',
            }
        ).addTo(map);

        map.trackResize = false
    },
    drawPoints: (data)=> {
        console.log("drawPoints");
        markers = []
        data.forEach(
            d=> {
                let marker = L.marker(
                    cords(d.geometry.coordinates), {
                        icon: redMarker
                    }
                )
                marker.on('click', x=>selectedStream(d.index))
                marker.addTo(map);
                marker.bindTooltip(
                    d.index.toString(), {
                        interactive: true,
                        permanent: true,
                        offset: [-14]
                    }
                )
                markers.push(marker)
            }
        )
        map.on(
            'zoomstart', function () {
                markers.forEach(x=>x.closeTooltip())
            }
        );
        map.on(
            'zoomend', function () {
                markers.forEach(x=>x.openTooltip())
            }
        );
    },

    swipePoint: (i)=> {
        let newIndex = selectedStream.silent(
            x=> {
                if (x == 1 && i == -1) return markers.length
                if (x == markers.length && i == 1) return 0
                return x + i
            }
        )
        let marker = markers[newIndex - 1]
        //console.log("marker.getLatLng()",marker.getLatLng());
        if (marker)
            map.setView(marker.getLatLng(), 6);
    }
};


