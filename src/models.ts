import texts from './data/texts.yml'
import detachments from './data/detachments.yml'
import resources from './data/resources.yml'
import words from './data/words.yml'
import { mergeWith } from 'lodash-es'
import { hash } from './hash'

interface Slots {
    min?: number
    max: number
}

const addSlots = (slotsss: Slots[]): Slots => {
    return slotsss.reduce((acc, s) => {
        acc.min = (acc.min || 0) + (s?.min || 0)
        acc.max += s?.max || 0
        return acc
    }, {min:0, max:0})
}

const roles = ['hq', 'el', 'tr', 'fa', 'hs', 'fl', 'lw', 'ft', 'dt'] as const
type Role = typeof roles[number]

type Detachment = {
    [index in Role]?: Slots
}
type Detachments = {
    [index:string]: Detachment
}

const addDetachments = (detsss: Detachment[]): Detachment => {
    return mergeWith({}, ...detsss, (a: Slots, b: Slots) => addSlots([a,b]))
}

const display = (kind:string,key:string): string => {
    if (texts[kind] && texts[kind][key]) {
        return texts[kind][key]
    }
    return `[display(${kind}.${key})]`
}

const composeDetachment = (baseKey:string, resourceCounts:Record<string,number>): Detachment => {
    const list = [detachments[baseKey]]
    Object.entries(resourceCounts).forEach(([resourceKey, count]) => {
        for (let i = 0; i < count; i++) {
            list.push(resources[resourceKey])
        }
    })
    return addDetachments(list)
}

const wordCats =  ['adjectives', 'nouns', 'organisations']
const makeStupidName = (d:Detachment): string => {
    let h = Math.abs(hash(d))
    console.log("hash", h)
    return wordCats.map(cat => {
        const wordList = words[cat]
        const n = h % wordList.length
        h = Math.floor(h / wordList.length)
        return wordList[n]
    }).join(" ")
}

export {
    display,
    detachments, 
    composeDetachment,
    resources,
    roles,
    makeStupidName
}
export type { Role, Detachment }
