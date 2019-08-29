import Component from '../Component.js';
import TaskItem from './TaskItem.js';

class TaskList extends Component {
    onRender(dom) {
        const tasks = this.props.tasks;
        const onUpdate = this.props.onUpdate;

        tasks.forEach(task => {
            const props = { task: task, onUpdate: onUpdate };
            const taskItem = new TaskItem(props);
            const taskItemDOM = taskItem.renderDOM();
            dom.appendChild(taskItemDOM);
        });
    }

    renderHTML() {
    
        return /*html*/`
        <ul class="task-container">
        </ul>
        `;
    }
}

export default TaskList;