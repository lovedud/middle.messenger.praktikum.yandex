import "./error.less"
import Block from "../../core/block";
import template from './error.hbs'

export default (props: any) : Block => {

    class ErrorPage extends Block{
        constructor(props: any) {
            super(props);
        }

        render() {
            return this.compile(template, {...this.props});
        }
    }

    const errorPage = new ErrorPage(props);

    return errorPage;
}
