import { createSignal, JSX } from "solid-js"

type RawData = {
    title: string
    preamble: JSX.Element
    content: JSX.Element
    related: Array<keyof typeof Repository>
}

export type Topic = RawData & {
    image: string
}

type TRepository = {
    [id: string]: RawData
}

const Repository: TRepository = {
    "core.magic.schools.light": {
        title: "Light Magic",
        preamble: (
            <>
                <p>
                    Allows the learning of Light Magic spells of the third and above level. Barbarians cannot learn Light magic or any subskills, instead learning Shatter Light.
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
        related: [
            "core.magic.schools.dark", 
            "core.magic.schools.conjuration", 
            "core.magic.schools.destructive",
        ],
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
        related: [
            "core.magic.schools.light", 
            "core.magic.schools.conjuration", 
            "core.magic.schools.destructive",
        ],
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
        related: [
            "core.magic.schools.light", 
            "core.magic.schools.conjuration", 
            "core.magic.schools.dark",
        ],
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
        related: [
            "core.magic.schools.light", 
            "core.magic.schools.dark", 
            "core.magic.schools.destructive",
        ],
    },
}

export type TopicID = keyof typeof Repository & string

export const [stack, setStack] = createSignal<Array<TopicID>>([
    "core.magic.schools.light",
])

export const putTopic = async (id?: TopicID, replaceAll = false) => {
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

const getImageURL = async (id: TopicID): Promise<string | undefined> => {
    const fileName = `/src/assets/docs/${id}.webp`
    return images[fileName]
}

export const getTopic = async (id: TopicID): Promise<Topic | undefined> => {
    const raw = Repository[id]
    if (!raw) return
    return {...raw, image: await getImageURL(id) ?? ""}
}