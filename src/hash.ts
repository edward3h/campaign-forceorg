function hashString(thing:string):number {
    switch (thing.length) {
        case 0: return 0
        case 1: return thing.charCodeAt(0)
        default:
            return hashArray(Array.from(thing))
    }
}

function hashArray(thing:any[]):number {
    let r = 0
    thing.forEach(item => {
        const v = hash(item)
        r = ((r<<5)-r) + v
        r = r & r
    })
    return r
}

function hash(thing:any):number {
    if (Array.isArray(thing)) {
        return hashArray(thing)
    }
    switch (typeof thing) {
        case "function":
        case "undefined":
        case "symbol":
            return 0
        case "number":
            return thing & thing
        case "boolean":
            return thing ? 1 : 0
        case "bigint":
            return hash(thing.toString())
        case "string":
            return hashString(thing)
        case "object":
            return hashArray(Object.entries(thing).sort())
        default:
            // should be unreachable?
            return 0
    }
}

export { hash }