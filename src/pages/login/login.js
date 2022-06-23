import box from '../../components/box/box';

const root = document.body;
root.append(box({
	title: 'Вход',
	buttonText: 'Войти',
	inputs:
		[
			{placeholder: 'Login'},
			{placeholder: 'Password'},
		],
	linkText: 'Забыли пароль?'
}));
