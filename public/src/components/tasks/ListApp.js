import Component from '../Component.js';
import Header from '../app/Header.js';
import TaskList from '../tasks/TaskList.js';
import { getTasks } from '../../services/to-do-api.js';


class ListApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'List of Tasks' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');
        const tasks = new TaskList ({ tasks: [] });
        main.appendChild(tasks.renderDOM());


        getTasks()
            .then(tasks => {
                tasks.update({ tasks });
            })
            .finally(() => {
                setTimeout(() => {}, 500);
            });
    }

    renderHTML() {
        return /*html*/`
        <div>
            <!-- header goes here -->
            <main></main>
        </div>
        `;
    }
}

export default ListApp;