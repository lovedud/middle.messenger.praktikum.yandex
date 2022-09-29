import Block from "./block";

export function renderDom(query: string, block: Block) : HTMLElement{
    const root = document.querySelector(query)

    if (!root) {
        throw new Error('Root not found')
    }
    root.append(block.getContent());
}
