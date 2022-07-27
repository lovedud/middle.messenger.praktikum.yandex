import Block from "../core/block";

export default function compile(tmpl: (ctx: any) => string, props: any): DocumentFragment {
    const fragment = document.createElement('template')
    const components: Record<string, Block> = {}

    Object.entries(props).forEach(([name, value]) => {
        if(value instanceof Block) {

            components[value.id] = value
            props[name] = `<div id="id-${value.id}"></div>`
        }
    })
    fragment.innerHTML = tmpl(props)

    Object.entries(components).forEach(([id, component]) => {
        const stub = fragment.content.querySelector(`#id-${id}`)

        if (!stub) {
            return
        }
        stub.replaceWith(component.getContent())
    })
    return fragment.content
}
