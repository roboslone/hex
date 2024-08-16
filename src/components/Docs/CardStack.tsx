import { stack } from "./Data"

import { createEffect, For, type ParentComponent } from "solid-js"

import { Card } from "./Card"

import styles from "./CardStack.module.css"

export const CardStack: ParentComponent = () => {
    let root: HTMLDivElement | undefined

    createEffect(() => {
        // Scroll to the top of the stack whenever data changes.
        // This is very useful when visible cards are reordered.
        if (root !== undefined && stack().length > 0) {
            root.scrollTo(0, 0)
        }
    })

    return (
        <div class={styles.CardStack} ref={root}>
            <For each={stack()}>
                {(id, index) => <Card index={index()} id={id} />}
            </For>
        </div>
    )
}