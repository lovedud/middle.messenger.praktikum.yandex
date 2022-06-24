import '../src/components/box/box.less';
import signIn from './pages/sign-in/sign-in'
import signUp from './pages/sign-up/sign-up'
import chat from './pages/chat/chat'

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
}
