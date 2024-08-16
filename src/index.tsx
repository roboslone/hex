/* @refresh reload */
import "./index.css"
import { CardStack } from "./components/Docs/CardStack"
import { render } from "solid-js/web"

const root = document.getElementById("root")

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
    )
}

render(() => <CardStack />, root!)
