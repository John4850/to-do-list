import Component from '../Component.js';
import Header from '../app/Header.js';
import TaskList from '../tasks/TaskList.js';
import { getList } from '../../services/to-do-api.js';


class ListApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'List of Tasks' });
        dom.prepend(header.renderDOM());

        const main = dom.querySelector('main');
        const taskList = new TaskList ({ tasks: [] });
        main.appendChild(taskList.renderDOM());


        getList()
            .then(tasks => {
                taskList.update({ tasks });
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