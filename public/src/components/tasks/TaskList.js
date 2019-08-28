import Component from '../Component.js';
import TaskItem from './TaskItem.js';

class TaskList extends Component {
    onRender(dom) {
        const tasks = this.props.tasks;
        const onUpdate = this.props.onUpdate;
        let target = dom.querySelector('.target');

        tasks.forEach(task => {
            const props = { task: task, onUpdate: onUpdate };
            const taskItem = new TaskItem(props);
            const taskItemDOM = taskItem.renderDOM();
            target.appendChild(taskItemDOM);
        });
    }

    renderHTML() {
    
        return /*html*/`
        <div class="task-container">
            <ul class='target'></ul>
        </div>
        `;
    }
}

export default TaskList;