import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'To Do';

        return /*html*/`
            <header>
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home </a>
                    <a href="./task-list.html"> Tasks </a>
                    <a href="./form.html"> Edit </a>
                </nav>
                <button class="log-out hidden">Log Out</button>
            </header>
        `;
    }
}

export default Header;