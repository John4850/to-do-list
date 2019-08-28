import Component from '../Component.js';

class TaskItem extends Component {
    onRender(dom) {
        const task = this.props.task;
        const onUpdate = this.props.onUpdate;
        // const onRemove = this.props.remove;
        
        const completeTask = dom.querySelector('.complete-task');
        completeTask.addEventListener('click', () => {
            task.done === true;

            onUpdate(task);
        });


    }


    renderHTML() {
        const task = this.props.task;
        return /*html*/`>
            <li>
                <div class="task-item">
                    <h2>${task.name}</h2>
                    <p class="task-description">${task.description}</p>
                    <img class="display-${task.done}" src="../../public/assets/checkmark.png">
                    <p>
                    <button class="complete-task">Completed: ${task.done}</button>
                    </p>
                </div>
            </li>
        </div>
        `;
    }
}

export default TaskItem;