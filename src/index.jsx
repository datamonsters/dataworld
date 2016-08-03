require("./app.css")

import 'normalize.css'

import {galeryModule} from "./modules/galery.module";
import {mapModule} from "./modules/map/map.module";
import {dataModule} from "./common/data";

mapModule.init()

dataModule.stream.on(mapModule.drawPoints)
dataModule.stream.on(galeryModule.setItems)
mapModule.selectedPointIndex.on(galeryModule.openIndex)
galeryModule.swipeSteam.on(mapModule.swipePoint)
