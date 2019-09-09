import Component from '../Component.js';
import store from '../../services/store.js';

class Header extends Component {
    onRender(dom) {
        const logoutButton = dom.querySelector('.log-out');
        if(store.hasToken()) {
            logoutButton.classList.remove('no-display');
            location.pathname = '/task-list.html';
        }
        if(!store.hasToken() && location.pathname !== '/auth.html') {
            logoutButton.classList.add('no-display');
        }

    }
    renderHTML() {
        const title = this.props.title || 'To Do';

        return /*html*/`
            <header>
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home </a>
                    <a href="./task-list.html"> Tasks </a>
                    <a href="./auth.html"> LogIn </a>
                </nav>
                <button class="log-out no-display">Log Out</button>
            </header>
        `;
    }
}

export default Header;