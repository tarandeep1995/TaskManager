document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');

    //Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task.text, task.completed, task.time));
    };

    //Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed'),
                time: item.querySelector('.task-time').textContent
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add task
    const addTask = (taskText, completed = false, taskTime = null) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        if (completed) taskItem.classList.add('completed');

        const taskDetails = document.createElement('div');
        taskDetails.className = 'task-details';

        const taskSpan = document.createElement('span');
        taskSpan.className = 'task-text';
        taskSpan.textContent = taskText;
        taskDetails.appendChild(taskSpan);

        const taskTimeSpan = document.createElement('span');
        taskTimeSpan.className = 'task-time';
        if (!taskTime) {
            const now = new Date();
            taskTime = now.toLocaleString();
        }
        taskTimeSpan.textContent = taskTime;
        taskDetails.appendChild(taskTimeSpan);

        taskItem.appendChild(taskDetails);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        });
        taskItem.appendChild(completeBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });
        taskItem.appendChild(removeBtn);

        taskList.appendChild(taskItem);
        saveTasks();
    };

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Load tasks when page loads
    loadTasks();
});
