import "./profile.less"
import template from './profile.hbs'
import Block from "../../core/block";
import store from "../../core/store"

export default (props: any) : Block => {

    class ProfilePage extends Block{
        constructor(props: any) {
            super(props);
        }

        render() {
            return this.compile(template, {...this.props});
        }
    }

    const profileProps = {...props, ...store.user}

    const profilePage = new ProfilePage(profileProps);

    return profilePage;
}
