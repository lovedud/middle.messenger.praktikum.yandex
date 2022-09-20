import "./error.less"
import Block from "../../core/block";
import template from './error.hbs'
import { Link } from "../../components/Link/link";
import compile from "../../utils/compile";


class Error500 extends Block<any>{
	constructor() {
		super('div', {
			title: "500",
			message: "Мы уже фиксим",
			link: new Link({
				link: "/",
				text: "Назад к чатам",
			})
		});
	}

	render() {
		return compile(template, this.props)
	}
}

const error500 = new Error500();

export default error500;
