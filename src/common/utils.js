export function getJSON(url) {
    console.log("getJSON",url);
    return new Promise(
        (ok, fall)=> {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == "200") {
                    ok(JSON.parse(xobj.responseText));
                }
            };
            xobj.send(null);
        }
    )
}