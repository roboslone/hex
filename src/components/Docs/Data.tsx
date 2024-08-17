import { createSignal, JSX } from "solid-js"
import {Tags} from "./Tags"

type RawData = {
    title: string
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
    "core.skill.light-magic": {
        title: "Light Magic",
        content: (
            <>
                <p>
                    Allows the learning of Light Magic spells of the third and above level. 
                    Barbarians cannot learn Light magic or any subskills, instead learning Shatter Light.
                </p>
                <h1>Mastery</h1>
                <p>
                    Basic Light Magic allows hero to learn Light Magic spells of the third circle and makes Light Magic more effective overall.
                </p>
                <p>
                    Advanced Light Magic allows hero to learn Light Magic spells of the fourth circle and makes Light Magic even more effective.
                </p>
                <p>
                    Expert Light Magic allows hero to learn Light Magic spells of the fifth circle and gives maximum power to Light Magic.
                </p>
            </>
        ),
        tags: new Tags().add("core.affinity", "air"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "light"),
    },
    "core.skill.dark-magic": {
        title: "Dark Magic",
        content: (
            <>
                <>
                    <p>
                        Allows the learning of Dark Magic spells of the third and above level. Barbarians cannot learn Dark magic or any subskills, instead learning Shatter Dark.
                    </p>
                </>
                <h1>Mastery</h1>
                <p>
                    Basic Dark Magic allows hero to learn Dark Magic spells of the third circle and makes Dark Magic more effective overall.
                </p>
                <p>
                    Advanced Dark Magic allows hero to learn Dark Magic spells of the fourth circle and makes Dark Magic even more effective.
                </p>
                <p>
                    Expert Dark Magic allows hero to learn Dark Magic spells of the fifth circle and gives maximum power to Dark Magic.
                </p>
            </>
        ),
        tags: new Tags().add("core.affinity", "water"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "dark"),
    },
    "core.skill.destructive-magic": {
        title: "Desctructive Magic",
        content: (
            <>
                <p>
                    Allows the learning of Destructive Magic spells of the third and above level. Barbarians cannot learn Destructive magic or any subskills, instead learning Shatter Destruction.
                </p>
                <h1>Mastery</h1>
                <p>
                    Basic Destructive Magic allows hero to learn Destructive Magic spells of the third circle and makes Destructive Magic more effective overall.
                </p>
                <p>
                    Advanced Destructive Magic allows hero to learn Destructive Magic spells of the fourth circle and makes Destructive Magic even more effective.
                </p>
                <p>
                    Expert Destructive Magic allows hero to learn Destructive Magic spells of the fifth circle and gives maximum power to Destructive Magic.
                </p>
            </>
        ),
        tags: new Tags().add("core.affinity", "fire"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "destructive"),
    },
    "core.skill.conjuration-magic": {
        title: "Conjuration Magic",
        content: (
            <>
                <p>
                    Allows the learning of Conjuration Magic spells of the third and above level. Barbarians cannot learn Conjuration magic or any subskills, instead learning Shatter Conjuration.
                </p>
                <h1>Mastery</h1>
                <p>
                    Basic Conjuration Magic allows hero to learn Conjuration Magic spells of the third circle and makes Conjuration Magic more effective overall.
                </p>
                <p>
                    Advanced Conjuration Magic allows hero to learn Conjuration Magic spells of the fourth circle and makes Conjuration Magic even more effective.
                </p>
                <p>
                    Expert Conjuration Magic allows hero to learn Conjuration Magic spells of the fifth circle and gives maximum power to Conjuration Magic.
                </p>
            </>
        ),
        tags: new Tags().add("core.affinity", "earth"),
        matchRelated: (_, data) => data.tags.match("core.magic.school", "conjuration"),
    },
    "core.spells.resurrection": {
        title: "Resurrection",
        content: (
            <>
                <p>
                    Resurrects a number of creatures equal to the caster's level.
                </p>
                <p>
                    Advanced mastery is required for permanent resurrection.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light", "conjuration"),
        matchRelated: (id, data) => (
            id === "core.skill.light-magic" ||
            id === "core.skill.conjuration-magic" ||
            data.tags.match("core.magic.school", "light") ||
            data.tags.match("unit.trait.alive")
        ),
    },
    "core.spells.animate-dead": {
        title: "Animate Dead",
        content: (
            <>
                <p>
                    Raises a number of creatures from the dead to serve the caster.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "dark", "conjuration"),
        matchRelated: (id, data) => (
            id === "core.skill.dark-magic" ||
            id === "core.skill.conjuration-magic" ||
            data.tags.match("core.magic.school", "dark") ||
            data.tags.match("unit.trait.dead")
        ),
    },
    "core.spells.fireball": {
        title: "Fireball",
        content: (
            <>
                <p>
                    Launches a fireball at a target, dealing fire damage.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "destructive", "conjuration"),
        matchRelated: (id, data) => (
            id === "core.skill.destructive-magic" ||
            id === "core.skill.conjuration-magic" ||
            data.tags.match("core.magic.school", "destructive")
        ),
    },
    "core.spells.blind": {
        title: "Blind",
        content: (
            <>
                <p>
                    Blinds a target, reducing its accuracy.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light", "destructive"),
        matchRelated: (id, data) => (
            id === "core.skill.light-magic" ||
            id === "core.skill.destructive-magic" ||
            data.tags.match("core.magic.school", "light") ||
            data.tags.match("core.magic.school", "destructive")
        ),
    },
    "core.spells.doom": {
        title: "Doom",
        content: (
            <>
                <p>
                    Dooms a target, dealing damage over time.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "dark", "destructive"),
        matchRelated: (id, data) => (
            id === "core.skill.dark-magic" ||
            id === "core.skill.destructive-magic" ||
            data.tags.match("core.magic.school", "dark") ||
            data.tags.match("core.magic.school", "destructive")
        ),
    },
    "core.spells.lightning-bolt": {
        title: "Lightning Bolt",
        content: (
            <>
                <p>
                    Strikes a target with lightning, dealing air damage.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light", "destructive"),
        matchRelated: (id, data) => (
            id === "core.skill.light-magic" ||
            id === "core.skill.destructive-magic" ||
            data.tags.match("core.magic.school", "light") ||
            data.tags.match("core.magic.school", "destructive")
        ),
    },
    "core.spells.summon-elementals": {
        title: "Summon Elementals",
        content: (
            <>
                <p>
                    Summons elementals to fight for the caster.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "conjuration"),
        matchRelated: (id, data) => (
            id === "core.skill.conjuration-magic" ||
            data.tags.match("core.magic.school", "conjuration")
        ),
    },  
    "core.spells.haste": {
        title: "Haste",
        content: (
            <>
                <p>
                    Increases the speed of a target.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light"),
        matchRelated: (id, data) => (
            id === "core.skill.light-magic" ||
            data.tags.match("core.magic.school", "light")
        ),
    },
    "core.spells.slow": {
        title: "Slow",
        content: (
            <>
                <p>
                    Reduces the speed of a target.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "dark"),
        matchRelated: (id, data) => (
            id === "core.skill.dark-magic" ||
            data.tags.match("core.magic.school", "dark")
        ),
    },
    "core.spells.shield": {
        title: "Shield",
        content: (
            <>
                <p>
                    Increases the defense of a target.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "light"),
        matchRelated: (id, data) => (
            id === "core.skill.light-magic" ||
            data.tags.match("core.magic.school", "light")
        ),
    },
    "core.spells.weaken": {
        title: "Weaken",
        content: (
            <>
                <p>
                    Decreases the defense of a target against physical attacks.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis purus a est vulputate iaculis ut a felis. 
                    Phasellus luctus tempor leo, eu rutrum elit scelerisque non.
                </p>
            </>
        ),
        tags: new Tags().add("core.magic.school", "dark"),
        matchRelated: (id, data) => (
            id === "core.skill.dark-magic" ||
            data.tags.match("core.magic.school", "dark")
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

const images = import.meta.glob("/src/assets/docs/*.webp", { query: "?url", import: "default", eager: true })

const getImageURL = async (id: TopicID): Promise<string> => {
    return images[`/src/assets/docs/${id}.webp`] as unknown as string ?? images["/src/assets/docs/placeholder.webp"] as unknown as string
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