import { ParentComponent, onCleanup, onMount } from "solid-js"
import styles from "./Wrapper.module.css"
import { KeyboardShortcut } from "../../shortcuts"
import classNames from "classnames"

type P = {
    onInvoke: (event?: MouseEvent) => void,
    title: string,
    shortcut?: KeyboardShortcut,
    compact?: boolean,
    wide?: boolean,
}

export const ButtonWrapper: ParentComponent<P> = props => {
    const matchShortcut = (event: KeyboardEvent) => {
        if (props.shortcut && props.shortcut.match(event)) {
            props.onInvoke()
        }
    }

    onMount(() => {
        if (props.shortcut) {
            document.addEventListener("keydown", matchShortcut)
        }
    })

    onCleanup(() => {
        if (props.shortcut) {
            document.removeEventListener("keydown", matchShortcut)
        }
    })

    const className = classNames(
        styles.ButtonWrapper,
        {
            [styles.Compact]: props.compact,
            [styles.Wide]: props.wide,
        },
    )

    return (
        <div class={className} onClick={props.onInvoke} title={props.title}>
            {props.children}
            {props.shortcut && (
                <div class={styles.Shortcut}>{props.shortcut.label}</div>
            )}
        </div>
    )
}