export class Tags extends Map<string, Set<string>> {
    add(key: string, ...values: string[]): Tags {
        if (!this.match(key)) {
            this.set(key, new Set())
        }
        const set = this.get(key)!
        for (const value of values) {
            set.add(value)
        }
        return this
    }

    match(key: string, value?: string): boolean {
        if (!this.has(key)) return false
        if (value === undefined) return this.has(key)
        return !!this.get(key)?.has(value)
    }

    *pairs(): Iterable<[string, string]> {
        for (const [key, values] of this) {
            for (const value of values) {
                yield [key, value]
            }
        }   
    }
}