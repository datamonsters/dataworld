import './rastercoords'
import {AStream} from "../../common/astream";

export const assetsUrl = (x)=>'/assets/' + x;
export const assetsUrlS = '/assets/';

L.Icon.Default.imagePath = assetsUrl("images");


const minZoom = 2,
    maxZoom = 5,
    img = [
        5000,  // original width of image
        3750   // original height of image
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
export const mapModule = {
    selectedPointIndex: selectedStream,
    init: ()=> {
        map = L.map(
            'map', {
                minZoom: minZoom,
                maxZoom: maxZoom,
                trackResize: false,
                boxZoom: false
                //zoomControl: false
            }
        );
        rc = new L.RasterCoords(map, img);
        rc.setMaxBounds();
        map.setView(rc.unproject([1764, 764]), 4);
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
                    rc.unproject(d.geometry.coordinates), {
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
        let newIndex = selectedStream.silent(x=>x + i)
        let marker = markers[newIndex]
        if (marker)
            map.setView(marker.getLatLng(), 4);
    }
};


