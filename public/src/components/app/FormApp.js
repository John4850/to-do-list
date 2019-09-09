import Component from '../Component.js';
import TaskForm from '../tasks/TaskForm.js';
import Header from './Header.js';
import { getTasks } from '../../services/to-do-api.js';


class TaskFormApp extends Component {
    onRender(dom) {
        const header = new Header({ title: 'add tasks' });
        dom.prepend(header.renderDOM());

        const main = dom.qeurySelector('main');

        getTasks()
            .then(tasks => {
                const taskForm = new TaskForm({ tasks });
                main.appendChild(taskForm.renderDOM());
            })
            .finally(() => {
                setTimeout(() => {

                }, 500);
            });
    }

    renderHTML() {
        return /*html*/`
        <div>
            <main>
            </main>
        </div>     
        `;
    }
}

export default TaskFormApp;