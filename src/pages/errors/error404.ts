import template from './error.hbs';
import {Link} from "../../components/Link/link";
import Block from "../../core/block";
import compile from "../../utils/compile";

export default class Error404 extends Block {
	constructor() {
		super('div', {
			title: "404",
			message: "Не туда попали",
			link: new Link({
				link: '/login',
				text: 'Назад'
			})
		});
	}

	render() {
		return compile(template, this.props);
	}
};
