import { Component, onMount, createSignal } from "solid-js"
import { TopicID, Topic, getTopic, putTopic } from "./Repository"
import styles from "./Reference.module.css"

type P = {
    id: TopicID,
}

export const Reference: Component<P> = props => {
    const [loading, setLoading] = createSignal(false)

    let data: Topic | undefined
    onMount(async () => {
        setLoading(true)
        try {
            data = await getTopic(props.id)
        } finally {
            setLoading(false)
        }
    })

    const handleClick = (event: MouseEvent) => {
        event.stopPropagation()
        putTopic(props.id, event.shiftKey)
    }

    return (
        <div class={styles.Reference} onClick={handleClick}>
            {loading() ?
                (
                    <div>Loading...</div>
                ) : (
                    <>
                        <img class={styles.Image} src={data?.image} />
                        <div class={styles.Content}>
                            <div class={styles.Label}>{data?.title}</div>
                            <code>{props.id}</code>
                        </div>
                    </>
                )}
        </div>
    )
}