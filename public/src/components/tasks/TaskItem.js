import Component from '../Component.js';

class TaskItem extends Component {
    renderHTML() {
        const task = this.props.task;
        return /*html*/`
            <li class="task-item">
                <div class="task-container">
                    <h2>${task.name}</h2>
                    <p class="task-description">${task.description}</p>
                    <p>Completed: ${task.done}</p>
                </div>
            </li>
        `;
    }
}

export default TaskItem;