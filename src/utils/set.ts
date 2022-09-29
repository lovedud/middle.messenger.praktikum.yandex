import {merge} from "./merge";

export const set = (object: Record<string, any>, path: string, value: any): Record<string, any> => {
    const result = path.split('.').reduceRight((acc, key) => ({
        [key]: acc,
    }), value as any)

    return merge(object, result)
}