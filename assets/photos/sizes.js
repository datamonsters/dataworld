var fs = require("fs")
var glob = require("glob")
var sizeOf = require('image-size')

glob("*.png", {mark: true}, function (er, files) {
    let sizes = files.map(f=>{
        var dimensions = sizeOf(f);
        return {
            name:f,
            w:dimensions.width,
            h:dimensions.height
        }
    })
    fs.writeFile('sizes.json', JSON.stringify(sizes), (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
})