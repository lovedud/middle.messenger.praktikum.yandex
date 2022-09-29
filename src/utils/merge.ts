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