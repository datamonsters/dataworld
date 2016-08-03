import * as R from "ramda";
import {AStream} from "../common/astream";
let items;
let swipeSteam = AStream()
const open = (index)=> {
    {
        var options = {
            history: false,
            //focus: false,
            index: index-1,
            showAnimationDuration: 200,
            hideAnimationDuration: 400,
            bgOpacity: 0.3
        };
        var pswpElement = document.querySelectorAll('.pswp')[0];

        var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
        gallery.listen('beforeChange', swipeSteam);
    }
};


export const galeryModule = {
    openIndex: open,
    setItems: (x)=> items = x,
    swipeSteam:swipeSteam
}
