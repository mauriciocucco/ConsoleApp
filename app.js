require('colors');
const { inquirerMenu, inquirerPause, readInput } = require('./lib/inquirer');
const { saveDB, readDB } = require('./lib/db');
const Tasks = require('./models/Tasks');
// const { showMenu, pause } = require('./lib/messages');


const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const dbTasks = readDB();
    tasks._list = dbTasks;

    do {
        // opt = await showMenu();
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Ingrese la descripción de la tarea: ');
                const newTask = tasks.createTask(desc); 
                console.log(`\nSe ha creado la tarea ${ JSON.stringify(newTask) }`);
            break;
            case '2':
                console.log(tasks.listArr);   
            break;    
        };

        saveDB(tasks._list);

        if(opt !== '0') await inquirerPause();
        
    } while (opt !== '0');

};

main();