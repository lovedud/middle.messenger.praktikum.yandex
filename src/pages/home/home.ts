import Block from "../../core/block";
import template from './home.hbs'
import { DivLink } from '../../components/Link/divlink';
import "./home.less";

export default (indexPages : Array<Array<string>>) : Block => {

    let props : Record<string, Block[] | Block> = {};

    props.links = indexPages.map(item => {
        return new DivLink({
            link: item[1],
            text: item[0],
            className: "home__link"
        });
    });

    class HomePage extends Block{
        constructor(props: Record<string, Block[] | Block>) {
            super(props);
        }

        render() {
            return this.compile(template, {...this});
        }
    }

    const homePage = new HomePage(props);

    return homePage
}
