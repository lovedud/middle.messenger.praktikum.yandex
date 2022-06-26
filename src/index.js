import '../src/components/box/box.less';
import '../src/components/error/error.less';
import signIn from './pages/sign-in/sign-in';
import signUp from './pages/sign-up/sign-up';
import chat from './pages/chat/chat';
import userProfileSettings from './pages/userProfile/userProfileSettings';
import error404 from './pages/errors/error404';
import error500 from './pages/errors/error500';

const root = document.querySelector(".root");
const path = window.location.pathname;

const signInNode = signIn();

switch (path) {
	case '/':
		root.innerHTML = signInNode;
		break;
	case '/sign-in':
		root.innerHTML = signIn();
		break;
	case '/sign-up':
		root.innerHTML = signUp();
		break;
	case '/chat':
		root.textContent = chat();
		break;
	case '/user/settings':
		root.innerHTML = userProfileSettings();
		break;
	case 'error404':
		root.innerHTML = error404();
		break;
	case 'error500':
		root.innerHTML = error500();
		break;
}
