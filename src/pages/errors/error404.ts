import template from './error.hbs';
import {Link} from "../../components/Link/link";
import Block from "../../core/block";
import compile from "../../utils/compile";

export default class Error404 extends Block {
	constructor(props) {
		super('div', props);
	}

	render() {
		const LinkBack = new Link({
			link: '/login',
			text: 'Назад'
		})

		return compile(template, {
			title: "404",
			message: "Не туда попали",
			link: LinkBack
		});
	}
};
