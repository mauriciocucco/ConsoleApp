require('colors');
const { inquirerMenu, inquirerPause, readInput, toDeleteList, inquirerConfirm, checkList } = require('./lib/inquirer');
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
                tasks.showTasksList();  //listo las tareas     
            break;    
            case '3':
                tasks.filterTasksList();  //listo las tareas completadas
            break;
            case '4':
                tasks.filterTasksList(false);  //listo las tareas pendientes
            break;   
            case '5':
                const completedTaks = await checkList(tasks.listArr, 'Seleccione las tareas a completar: ');

                tasks.changeTasksStatus(completedTaks);
            break;
            case '6': //borrar una tarea
                const deletedTaskId = await toDeleteList(tasks.listArr);

                if(deletedTaskId === '0') break;

                const deleteConfirmation = await inquirerConfirm('¿Está seguro que desea continuar?');
                
                if(deleteConfirmation) {
                    tasks.deleteTask(deletedTaskId)
                    console.log('\nTarea borrada correctamente'.green)
                };
            break;         
        };

        saveDB(tasks._list); //guardo las tareas en el json

        if(opt !== '0') await inquirerPause();
        
    } while (opt !== '0');

};

main();