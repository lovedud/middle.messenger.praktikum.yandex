import Route from './Route';
import Block from "./block";

export type Pathname = string

class Router {
    private static __instance: Router

    public routes: Route[] = []

    public history = window.history;

    private _currentRoute: Route | null = null

    private readonly _rootQuery: string = ''

    constructor(rootQuery?: string,) {
        if (Router.__instance) {
            return Router.__instance;
        }
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: Pathname, block: Block, isProtected: boolean): Router {
        const route = new Route(pathname, block, {rootQuery: this._rootQuery}, isProtected);
        this.routes.push(route);
        return this
    }

    getCurrentRoute(): Route | null {
        return this._currentRoute
    }

    start(): void {
        window.onpopstate = event => {
            if (event.currentTarget !== null) {
                const target = event.currentTarget as Window
                this._onRoute(target.location.pathname);
            }
        };

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: Pathname): void {
        const route = this.getRoute(pathname) ?? this.getRoute('errorPage') as Route;
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        this._currentRoute = route;
        route.render();
    }


    go(pathname: Pathname): void {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back(): void {
        this.history.back()
    }

    forward(): void {
        this.history.forward()
    }

    getRoute(pathname: Pathname): Route | undefined {
        return this.routes.find(route => route.pathname === pathname);
    }

}

export default Router;