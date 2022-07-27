import Block from "./modules/Block";
import Login from "./pages/login/login";
import SignUp from "./pages/sign-up/sign-up";
import Profile from "./pages/profile/profile";
import Error404 from "./pages/errors/error404";
import Error500 from "./pages/errors/error500";
import MainPage from "./pages/main/main";

const path = window.location.pathname;

export function render(query: string, block: Block) {
	const root = document.querySelector(query)

	if (!root) {
		throw new Error('Root not found')
	}

	root.innerHTML = ''
	root.appendChild(block.getContent())

	return root
}

switch (path) {
	case '/':
		render('#app', new Login())
		break;
	case '/login':
		render('#app', new Login())
		break;
	case '/sign-up':
		render('#app', new SignUp())
		break;
	case '/profile':
		render('#app', new Profile())
		break;
	case '/main':
		render('#app', new MainPage())
		break;
	case '/error404':
		render('#app', new Error404())
		break;
	case '/error500':
		render('#app', new Error500())
		break;
}
