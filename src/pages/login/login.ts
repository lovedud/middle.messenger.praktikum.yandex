import "./login.less"
import Block from "../../core/block";
import template from './login.hbs'
import store from "../../core/store"

export default (props: any) : Block => {

    class LoginPage extends Block{
        constructor(props: any) {
            super(props);
        }

        render() {
            return this.compile(template, {...this.props});
        }
    }

    const loginProps = {...props, ...store.user}

    const loginPage = new LoginPage(loginProps);

    return loginPage;
}
