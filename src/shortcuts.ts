type Matcher = (e: KeyboardEvent) => boolean

export type KeyboardShortcut = {
    label: string,
    match: Matcher,
}

const Noop: KeyboardShortcut = {
    label: "",
    match: () => false,
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

export const getSerialShortcut = (index?: number): KeyboardShortcut => {
    if (index === undefined || index > 8) {
        return Noop
    }

    return {
        label: `${index + 1}`,
        match: (e: KeyboardEvent) => {
            return !e.shiftKey && !e.metaKey && !e.ctrlKey && e.key === `${index + 1}`
        },
    }
}
