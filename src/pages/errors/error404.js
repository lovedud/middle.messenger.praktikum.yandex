import error from '../../components/error/error.hbs';

export default function error404() {
	return error({
		error: '404',
		description: 'Не туда попали',
		link: {
			linkText: 'Назад',
			url: '/sign-up'
		}
	});
};
