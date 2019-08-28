import Component from '../Component.js';
import Header from '../app/Header.js';
import TaskList from '../tasks/TaskList.js';
import { getList, updateTask } from '../../services/to-do-api.js';
import TaskForm from '../tasks/TaskForm.js';


class ListApp extends Component {
    onRender(dom) {
        const main = dom.querySelector('main');
        const header = new Header({ title: 'List of Tasks' });
        main.prepend(header.renderDOM());

        
        const taskList = new TaskList({ tasks: [],
            onUpdate: task => {
                return updateTask(task)
                    .then(updated => {
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        
                        // what to do with updated?
                        const index = tasks.indexOf(task);
                        tasks.splice(index, 1, updated);

                        taskList.update({ tasks });
                    })
                    .finally(() => {
                        // loading.update({ loading: false });
                    });
                    
            },
        });
        main.appendChild(taskList.renderDOM());
        
        const form = new TaskForm;
        main.appendChild(form.renderDOM());

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