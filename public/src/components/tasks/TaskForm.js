import Component from '../Component.js';
import { addTask } from '../../services/to-do-api.js';

class TaskForm extends Component {
    onRender(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);
        
            const task = {
                name: formData.get('name'),
                description: formData.get('description')
            };
            addTask(task)
                .then(() => {
                    alert('Task Added!');
                })
                .catch(err => {
                    console.log('Task Not Saved : ', err);
                });
        });
    }
    
    renderHTML() {
        return /*html*/`
        <form class="task-form">
        <p>
            <label for="name">New Task</label>
            <input id="name" name="name required placeholder="Task Name">
        </p>
        <p>
            <label for="description">Description</label>
            <input id="description" name="description" required>
        </p>
        <p><button>Add Task</button>
        `;
    }
}

export default TaskForm;