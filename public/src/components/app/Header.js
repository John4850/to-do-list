import Component from '../Component.js';

class Header extends Component {
    renderHTML() {
        const title = this.props.title || 'To Do';

        return /*html*/`
            <header>
                <h1>${title}</h1>
                <nav>
                    <a href="./">Home</a>
                    <a href="./task-list.html">Tasks</a>
                </nav>
            </header>
        `;
    }
}

export default Header;