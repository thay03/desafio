const fs = require('fs');
const csvParser = require('csv-parser');

fs.appendFile.post('/tasks/import', (req, res) => {
    const result = [];

    fs.createReadStream('./tasks.css')
    .pipe(csvParser())
    .on('data', (data) => {
        result.push({
        id: uuvidv4(),
        title: data.title,
        descripition:data.descripition,
        completed_at: null,
        created_at: new Date(),
        updated_at: new DataTransfer(),
        });
    })
    .on('end', () => {
        tasks.push(...result);
        res.status(201).json(result);
   });
});