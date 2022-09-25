export function isObj(value: any): boolean {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]'
}

export const isArray = (variable: unknown): variable is unknown[] => {
    return Array.isArray(variable)
}

export const isEqual = (x: Record<string, any>, y: Record<string, any>): boolean => {
    const ok = Object.keys, tx = typeof x, ty = typeof y
    return x && y && tx === 'object' && tx === ty ? (
        ok(x).length === ok(y).length &&
        ok(x).every(key => isEqual(x[key], y[key]))
    ) : (x === y)
}

export const merge = (lhs: Record<string, any>, rhs: Record<string, any>): Record<string, any> => {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p], rhs[p])
            } else {
                lhs[p] = rhs[p]
            }
        } catch (e) {
            lhs[p] = rhs[p]
        }
    }

    return lhs
}

export const set = (object: Record<string, any>, path: string, value: any): Record<string, any> => {
    const result = path.split('.').reduceRight((acc, key) => ({
        [key]: acc,
    }), value as any)

    return merge(object, result)
}
