import {getJSON} from "./utils";
import {AStream} from "./astream";
import * as R from "ramda";


let dataStream = AStream()
export const dataModule = {
    stream: dataStream
}

Promise.all(
    [
        getJSON("/assets/pos.json"),
        getJSON("/assets/photos/sizes.json"),
    ]
).then(
    a=> {
        let merged = {}
        a[1].forEach(x=>merged[x.name] = x)
        a[0].data.forEach(
            x=> {
                merged[x.image] = R.mergeAll([merged[x.image], x])
            }
        );
        merged = R.values(merged);
        //console.log("me",merged);
        dataStream(
            R.map(
                o=> {
                    let index = parseInt(o.num)
                    return {
                        index: index,
                        src: "/assets/photos/" + o.image,
                        w: o.w,
                        h: o.h,
                        type: "Feature",
                        properties: {index: index},
                        geometry: {
                            type: "Point",
                            coordinates: [o.x, o.y]
                        }
                    }
                }
                , merged
            ).sort((a, b)=>{
                a.index > b.index
            })
        )
    }
)