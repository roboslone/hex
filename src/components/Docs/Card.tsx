import { ButtonWrapper } from "../Button/Wrapper"
import { type Component, createSignal, For, onMount, Show } from "solid-js"
import { TopicID, getTopic, putTopic, popTopic, Topic, shortTopicMode, setShortTopicMode } from "./Data"
import { VsChromeClose } from "solid-icons/vs"
import { AiFillCopy } from "solid-icons/ai"
import classNames from "classnames"
import styles from "./Card.module.css"
import { Reference } from "./Reference"
import { FaSolidHashtag } from "solid-icons/fa"
import { IoInvertModeOutline } from "solid-icons/io"
import { Shortcuts } from "../../shortcuts"

type P = {
    index: number,
    id: TopicID,
}

export const Card: Component<P> = props => {
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
        putTopic(props.id)
    }

    return (
        <div class={classNames(styles.Card, {[styles.CardSecondary]: props.index !== 0})} onClick={handleClick}>
            {loading() ?
                (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div class={styles.Cover}>
                            <img src={data?.image} class={styles.Image} />
                            <div class={styles.Title}>
                                {data?.title || "–"}
                            </div>

                            {props.index !== 0 &&
                                <ButtonWrapper 
                                    title="Close"
                                    onInvoke={event => { event?.stopPropagation(); popTopic(props.id) }} 
                                    compact
                                >
                                    <VsChromeClose color="var(--color-gold)" />
                                </ButtonWrapper>
                            }

                            {props.index === 0 && (
                                <>
                                    <ButtonWrapper
                                        title="Switch mode"
                                        shortcut={Shortcuts.ShiftK}
                                        onInvoke={() => { setShortTopicMode(v => !v) }}
                                    >
                                        <IoInvertModeOutline />
                                    </ButtonWrapper>
                                    <ButtonWrapper
                                        title="Copy ID to clipboard"
                                        shortcut={Shortcuts.ShiftI} 
                                        onInvoke={() => { 
                                            navigator.clipboard.writeText(props.id)
                                        }}
                                    >
                                        <AiFillCopy />
                                    </ButtonWrapper>
                                    <ButtonWrapper 
                                        title="Close"
                                        shortcut={Shortcuts.Escape}
                                        onInvoke={() => popTopic(props.id)}
                                        compact
                                    >
                                        <VsChromeClose color="var(--color-gold)" />
                                    </ButtonWrapper>
                                </>
                            )}
                        </div>
                        <div class={styles.Content}>
                            {data?.preamble}

                            <Show when={shortTopicMode()}>
                                {data?.content}
                            </Show>

                            <Show when={!shortTopicMode()}>
                                {props.index === 0 && data?.related && data.related.length > 0 && (
                                    <>
                                        <h3>Related</h3>
                                        <div style={{display: "flex", gap: "6px", "flex-direction": "column"}}>
                                            <For each={data?.related}>
                                                {(id, index) => (
                                                    <Reference id={id} serialIndex={index()} />
                                                )}
                                            </For>
                                        </div>
                                    </>
                                )}

                                {data?.tags &&
                                    <>
                                        <h3>Tags</h3>
                                        <div style={{display: "flex", "flex-direction": "column", "gap": "6px"}}>
                                            {Array.from(data.tags.pairs()).map(([k, v]) => (
                                                <ButtonWrapper title="Show related" onInvoke={() => {}} wide>
                                                    <FaSolidHashtag />
                                                    <code>{k}:{v}</code>
                                                </ButtonWrapper>
                                            ))}
                                        </div>
                                    </>
                                }
                            </Show>

                        </div>
                    </>
                )
            }
        </div>
    )
}