import box from "../../components/box/box.hbs";
import avatar from '../../../static/images/avatar.png';

export default function userProfileSettings() {
	return box({
		title: 'Настройки пользователя',
		buttonText: 'Сохранить',
		image: avatar,
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
			linkText: 'Отмена',
			url: '/sign-up'
		}
	});
};
