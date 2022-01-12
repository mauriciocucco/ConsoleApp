require('colors');

const showMenu = () => {
    return new Promise((resolve, reject) => {
        console.clear();

        console.log('============================'.green);
        console.log('    Seleccione una opción'.green);
        console.log('============================\n'.green);

        console.log(`${'1.'.magenta} Crear tarea`);
        console.log(`${'2.'.magenta} Listar tareas`)
        console.log(`${'3.'.magenta} Listar tareas completadas`);
        console.log(`${'4.'.magenta} Listar tareas pendientes`);
        console.log(`${'5.'.magenta} Completar tarea(s)`);
        console.log(`${'6.'.magenta} Borrar tarea`);
        console.log(`${'0.'.magenta} Salir\n`);

        const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
        })

        readline.question('Seleccione una opción: ', (option) => {
            // console.log(option);
            readline.close();
            resolve(option);
        })
    })
};

const pause = () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresione ${'ENTER'.bgCyan} para continuar\n`, (option) => {
            readline.close();
            resolve();
        })
    })
    
};

module.exports = {
    showMenu,
    pause
};