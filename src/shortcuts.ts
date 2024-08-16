export type KeyboardShortcut = {
    label: string,
    match: (e: KeyboardEvent) => boolean,
}

export const Shortcuts = {
    ShiftK: {
        label: "⇧K",
        match: (e: KeyboardEvent) => e.shiftKey && e.key === "K",
    },
    ShiftI: {
        label: "⇧I",
        match: (e: KeyboardEvent) => e.shiftKey && e.key === "I",
    },
    Escape: {
        label: "⎋",
        match: (e: KeyboardEvent) => e.key === "Escape",
    },
}