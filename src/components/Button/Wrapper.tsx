import { ParentComponent, onCleanup, onMount } from "solid-js"
import styles from "./Wrapper.module.css"
import { KeyboardShortcut } from "../../shortcuts"
import classNames from "classnames"

type P = {
    onInvoke: (event?: MouseEvent) => void,
    shortcut?: KeyboardShortcut,
    compact?: boolean,
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
        },
    )

    return (
        <div class={className} onClick={props.onInvoke}>
            {props.children}
            {props.shortcut && (
                <div class={styles.Shortcut}>{props.shortcut.label}</div>
            )}
        </div>
    )
}