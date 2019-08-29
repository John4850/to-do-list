import Component from '../Component.js';
import Header from '../app/Header.js';
import TaskList from '../tasks/TaskList.js';
import { getList, updateTask, addTask } from '../../services/to-do-api.js';
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
                        console.log(task);
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        
                        // what to do with updated?
                        const index = tasks.indexOf(task.id);
                        tasks.splice(index, 1, updated.id);

                        taskList.update({ tasks });
                        
                    });
            },
        });
        main.appendChild(taskList.renderDOM());
            
        const form = new TaskForm({
            onAdd: task => {
                // part 1: do work on the server
                return addTask(task)
                    .then(saved => {
                        // part 2: integrate back into our list
                        const tasks = this.state.tasks;
                        tasks.push(saved);
                        taskList.update({ tasks });
                    })
                    .finally(() => {
                        location.reload(true);
                    });
            }

        });
// -----------------------------_FIX THIS ^ ^ ^ -------------//


        main.appendChild(form.renderDOM());
            
        getList()
            .then(tasks => {
                this.state.tasks = tasks;
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