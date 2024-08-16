import { Component, onMount, createSignal } from "solid-js"
import { TopicID, Topic, getTopic, putTopic } from "./Data"
import styles from "./Reference.module.css"
import { ButtonWrapper } from "../Button/Wrapper"
import { getSerialShortcut } from "../../shortcuts"

type P = {
    id: TopicID,
    serialIndex?: number,
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

    const handleClick = (event?: MouseEvent) => {
        event?.stopPropagation()
        putTopic(props.id)
    }

    return (
        <div class={styles.Reference} onClick={handleClick}>
            {loading() ?
                (
                    <div>Loading...</div>
                ) : (
                    <ButtonWrapper shortcut={getSerialShortcut(props.serialIndex)} onInvoke={handleClick}>
                        <img class={styles.Image} src={data?.image} />
                        <div class={styles.Content}>
                            <div class={styles.Label}>{data?.title}</div>
                        </div>
                    </ButtonWrapper>
                )}
        </div>
    )
}