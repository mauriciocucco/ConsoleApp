require('colors');
const { inquirerMenu, inquirerPause, readInput } = require('./lib/inquirer');
const { saveDB, readDB } = require('./lib/db');
const Tasks = require('./models/Tasks');
// const { showMenu, pause } = require('./lib/messages');


const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const dbTasks = readDB();

    if(dbTasks) tasks._list = dbTasks; //cargo las tareas del json

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
                tasks.finalList();  //listo las tareas 
            break;    
        };

        saveDB(tasks._list); //guardo las tareas en el json

        if(opt !== '0') await inquirerPause();
        
    } while (opt !== '0');

};

main();