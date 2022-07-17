import "./sign-in.less"
import Block from "../../core/block";
import template from './sign-in.hbs'
import store from "../../core/store"

export default (props: any) : Block => {

	class SigninPage extends Block{
		constructor(props: any) {
			super(props);
		}

		render() {
			return this.compile(template, {...this.props});
		}
	}

	const signinProps = {...props, ...store.user}

	const signinPage = new SigninPage(signinProps);

	return signinPage;
}
