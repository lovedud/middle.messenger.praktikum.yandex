import error from '../../components/error/error.hbs';

export default function error500() {
	return error({
		error: '500',
		description: 'Мы уже фиксим',
		link: {
			linkText: 'Назад',
			url: '/sign-up'
		}
	});
};
