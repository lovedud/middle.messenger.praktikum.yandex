import "./main.less"
import template from './main.hbs'
import Block from "../../core/block";
import store from "../../core/store"

export default (props: any) : Block => {

    class MainPage extends Block{
        constructor(props: any) {
            super(props);
        }

        render() {
            return this.compile(template, {...this.props});
        }
    }

    const mainProps = {...props, ...store.user}

    const mainPage = new MainPage(mainProps);

    return mainPage;
}
