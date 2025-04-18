const express = require('express');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(express.json());

const tasks = [];

app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    const task = {
        id: uuidv4(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
    };

    tasks.push(task);
    return res.status(201).json(task);
});

// fitro para buscar todas as tarefas
app.get('/tasks',(req, res) => {
    const {title, description} = req.query;

    let filteredTasks = tasks;

    if(title){
        filteredTasks = filteredTasks.filter(task =>
            task.title.includes(title)
        );
    }
    
    if(description){
        filteredTasks = filteredTasks.filter(task =>
            task.description.includes(description));
    }
    return res.json(filteredTasks);
});

//atualizar uma task
app.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const {title, descripition} = req.body;
    const task = tasks.find(task => task.id ===id);
    if (!task) return res.status(404).json({error: 'Task não encontrada'});

    if(title) task.title = title;
    if(descripition) task.description = descripition;
    task.updated_at = new Date();

    return res.json(task);
});

//deletar uma task
app.delete('/tasks/:id', (req, res) => {
    const {id} = req.params;

    const index = tasks.findIndex(task => task.id === id);
    if(index === -1) return res.status(404).json({error: 'Task não encontrada'
    });

    tasks.splice(index,1);
    return res.status(204).send();
});
// marca como concluido
app.patch('/tasks/:id/complete', (req, res) => {
    const {id} = req.params;

    const task = tasks.find(task => task.id === id);
    if (!task)return res.status(404).json({ error: 'task não encontrada'});

    task.completed_at = task.completed_at ? null : new Date();
    task.updated_at = new Date();

    return res.json(task)
})
app.listen(3000,() => console.log('servido rodando na porta 3000'));