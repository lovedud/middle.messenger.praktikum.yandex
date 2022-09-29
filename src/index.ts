import Login from "./pages/login/login";
import SignUp from "./pages/sign-up/sign-up";
import Profile from "./pages/profile/profile";
import Error404 from "./pages/errors/error404";
import Error500 from "./pages/errors/error500";
import MainPage from "./pages/main/main";
import Router from "./core/Router";
import AuthController from "./controllers/auth";
import chatsController from './controllers/chats'
import store from "./core/store";

const router = new Router("#app");

const authController = new AuthController();

router
	.use("/", Login)
	.use("/login", Login)
	.use("/sign-up", SignUp)
	.use("/profile", Profile)
	.use("/main", MainPage)
	.use("/error404", Error404)
	.use("/error500", Error500)
	.start();

/*
authController.getUserInfo().then((isAuth) => {
	if (isAuth) {
		chatsController.getChats()
	} else {
		const isPrivatePage = ['/login', '/sign-up'].includes(window.location.pathname)
		if (!isPrivatePage) {
			router.go('/login')
		}
	}
})*/

setInterval(() => {
	const {isAuth} = store.getState()

	if (isAuth) {
		chatsController.getChats()
	}
}, 10000)
