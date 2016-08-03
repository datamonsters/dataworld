export function AStream(v) {
    const fns = [];
    const vfn = (v)=> {
        if (v) {
            vfn.value = v;
            fns.forEach(f=>f(v));
        }
        return vfn.value;
    };
    vfn.value = v;
    vfn.on = (fn)=>{
        fns.push(fn);
    };
    vfn.silent = (fn=>{
        return vfn.value = fn(vfn.value)
    })
    return vfn;
}
