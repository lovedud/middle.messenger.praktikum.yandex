import box from '../../components/box/box.hbs';

export default function signUp() {
	return box({
		title: 'Регистрация',
		buttonText: 'Завести аккаунт',
		inputs:
			[
				{
					placeholder: 'Имя',
					name: 'first_name',
					type: 'text',
				},
				{
					placeholder: 'Фамилия',
					name: 'second_name',
					type: 'text',
				},
				{
					placeholder: 'Логин',
					name: 'login',
					type: 'text',
				},
				{
					placeholder: 'Почта',
					name: 'email',
					type: 'email',
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
