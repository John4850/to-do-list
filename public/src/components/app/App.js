import Component from '../Component.js';
import ListApp from '../tasks/ListApp.js';

class App extends Component {

    onRender(dom) {
        const listApp = new ListApp();
        dom.prepend(listApp.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <p></p>
                </main>
            </div>
        `;
    }
}

export default App;