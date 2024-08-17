import { createSignal, JSX } from "solid-js"
import {Tags} from "./Tags"

type RawData = {
    title: string
    preamble: JSX.Element
    content: JSX.Element

    tags: Tags
    matchRelated: (id: TopicID, data: RawData) => boolean
}

export type Topic = RawData & {
    id: TopicID,
    image: string,
    related: TopicID[],
}

type TRepository = {
    [id: string]: RawData
}

const getCategory = (id: TopicID): string => {
    return id.split(".").slice(0, -1).join(".")
}

const Repository: TRepository = {
    "core.magic.schools.light": {
        title: "Light Magic",
        preamble: (
            <>
                <p>
                    Allows the learning of Light Magic spells of the third and above level. 
                    Barbarians cannot learn Light magic or any subskills, instead learning Shatter Light.
                </p>
            </>
        ),
        content: (
            <>
                <h1>Mastery</h1>
                <ul>
                    <li>Basic Light Magic allows hero to learn Light Magic spells of the third circle and makes Light Magic more effective overall.</li>
                    <li>Advanced Light Magic allows hero to learn Light Magic spells of the fourth circle and makes Light Magic even more effective.</li>
                    <li>Expert Light Magic allows hero to learn Light Magic spells of the fifth circle and gives maximum power to Light Magic.</li>
                </ul>
            </>
        ),
        tags: new Tags().add("core.affinity", "air"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "light"),
    },
    "core.magic.schools.dark": {
        title: "Dark Magic",
        preamble: (
            <>
                <p>
                    Allows the learning of Dark Magic spells of the third and above level. Barbarians cannot learn Dark magic or any subskills, instead learning Shatter Dark.
                </p>
            </>
        ),
        content: (
            <>
                <h1>Mastery</h1>
                <ul>
                    <li>Basic Dark Magic allows hero to learn Dark Magic spells of the third circle and makes Dark Magic more effective overall.</li>
                    <li>Advanced Dark Magic allows hero to learn Dark Magic spells of the fourth circle and makes Dark Magic even more effective.</li>
                    <li>Expert Dark Magic allows hero to learn Dark Magic spells of the fifth circle and gives maximum power to Dark Magic.</li>
                </ul>
            </>
        ),
        tags: new Tags().add("core.affinity", "water"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "dark"),
    },
    "core.magic.schools.destructive": {
        title: "Desctructive Magic",
        preamble: (
            <>
                <p>
                    Allows the learning of Destructive Magic spells of the third and above level. Barbarians cannot learn Destructive magic or any subskills, instead learning Shatter Destruction.
                </p>
            </>
        ),
        content: (
            <>
                <h1>Mastery</h1>
                <ul>
                    <li>Basic Destructive Magic allows hero to learn Destructive Magic spells of the third circle and makes Destructive Magic more effective overall.</li>
                    <li>Advanced Destructive Magic allows hero to learn Destructive Magic spells of the fourth circle and makes Destructive Magic even more effective.</li>
                    <li>Expert Destructive Magic allows hero to learn Destructive Magic spells of the fifth circle and gives maximum power to Destructive Magic.</li>
                </ul>
            </>
        ),
        tags: new Tags().add("core.affinity", "fire"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "destructive"),
    },
    "core.magic.schools.conjuration": {
        title: "Conjuration Magic",
        preamble: (
            <>
                <p>
                    Allows the learning of Conjuration Magic spells of the third and above level. Barbarians cannot learn Conjuration magic or any subskills, instead learning Shatter Conjuration.
                </p>
            </>
        ),
        content: (
            <>
                <h1>Mastery</h1>
                <ul>
                    <li>Basic Conjuration Magic allows hero to learn Conjuration Magic spells of the third circle and makes Conjuration Magic more effective overall.</li>
                    <li>Advanced Conjuration Magic allows hero to learn Conjuration Magic spells of the fourth circle and makes Conjuration Magic even more effective.</li>
                    <li>Expert Conjuration Magic allows hero to learn Conjuration Magic spells of the fifth circle and gives maximum power to Conjuration Magic.</li>
                </ul>
            </>
        ),
        tags: new Tags().add("core.affinity", "earch"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "conjuration"),
    },
    "core.spells.resurrection": {
        title: "Resurrection",
        preamble: (
            <>
                <p>
                    Resurrects a number of creatures equal to the caster's level.
                    Advanced mastery is required for permanent resurrection.
                </p>
            </>
        ),
        content: (
            <>
                <h1>Effect</h1>
                <p>
                    Resurrects a number of creatures equal to the caster's level. 
                    The spell is permanent, but the creatures will disappear if the hero is defeated in combat.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light", "conjuration"),
        matchRelated: (id, data) => (
            id === "core.magic.schools.light" ||
            id === "core.magic.schools.conjuration" ||
            data.tags.match("core.magic.school", "light") ||
            data.tags.match("unit.trait.alive")
        ),
    },
}

for (const [id, data] of Object.entries(Repository)) {
    data.tags.add("category", getCategory(id))
}

export type TopicID = keyof typeof Repository & string

export const [stack, setStack] = createSignal<Array<TopicID>>([
    "core.spells.resurrection",
])

export const [shortTopicMode, setShortTopicMode] = createSignal(false)

export const putTopic = async (id?: TopicID, replaceAll = true) => {
    console.info("putTopic", id, replaceAll)

    if (!id) return []

    setStack(curr => {
        if (replaceAll) return [id]

        const keys = new Set(curr)
        if (keys.has(id)) {
            // Move to top.
            return [id, ...curr.filter(k => k !== id)]
        } else {
            // Add to top.
            return [id, ...curr]
        }
    })
}

export const popTopic = async (id: TopicID) => {
    setStack(curr => curr.filter(k => k !== id))
}

const images = import.meta.glob("/src/assets/docs/*.webp", { as: "url", eager: true })

const getImageURL = async (id: TopicID): Promise<string> => {
    return images[`/src/assets/docs/${id}.webp`]
}

const getRelated = async (targetID: TopicID, target: RawData): Promise<TopicID[]> => {
    const related = new Set<TopicID>()

    // Find topics of the same category.
    const targetCategory = getCategory(targetID)
    
    for (const [otherID, other] of Object.entries(Repository)) {
        console.info("=> getRelated", targetID, otherID)
        if (getCategory(otherID) === targetCategory) {
            related.add(otherID)
            console.info("category match", otherID)
            continue
        } else {
            console.info("category mismatch", targetCategory, getCategory(otherID))
        }

        if (target.matchRelated(otherID, other)) {
            related.add(otherID)
            console.info("tag match", otherID)
            continue
        } else {
            console.info("tag mismatch", targetID, otherID)
        }
    }

    related.delete(targetID)

    return Array.from(related).sort()
}

export const getTopic = async (id: TopicID): Promise<Topic | undefined> => {
    const data = Repository[id]
    if (!data) return

    const [image, related] = await Promise.all([
        getImageURL(id),
        getRelated(id, data),
    ])

    return {
        ...data,
        id,
        image,
        related,
    }
}