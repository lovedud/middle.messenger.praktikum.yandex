export const isArray = (variable: unknown): variable is unknown[] => {
    return Array.isArray(variable)
}