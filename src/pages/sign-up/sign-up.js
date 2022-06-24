import box from '../../components/box/box.hbs';

export default function signUp() {
	return box({
		title: 'Регистрация',
		buttonText: 'Завести аккаунт',
		inputs:
			[
				{
					placeholder: 'Почта',
					name: 'email',
					type: 'email',
				},
				{
					placeholder: 'Логин',
					name: 'login',
					type: 'text',
				},
				{
					placeholder: 'Имя',
					name: 'name',
					type: 'text',
				},
				{
					placeholder: 'Фамилия',
					name: 'surname',
					type: 'text',
				},
				{
					placeholder: 'Телефон',
					name: 'phone',
					type: 'tel',
				},
				{
					placeholder: 'Пароль',
					name: 'password',
					type: 'password',
				},
				{
					placeholder: 'Пароль (еще раз)',
					name: 'password',
					type: 'password',
				},
			],
		link: {
			linkText: 'Войти',
			url: '/sign-in'
		}
	});
};
