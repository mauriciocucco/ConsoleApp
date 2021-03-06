const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'opt',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.magenta} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.magenta} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.magenta} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.magenta} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.magenta} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.magenta} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.magenta} Salir`
            }
        ]
    }
];

const continueByEnter = [
    {
        type: 'input',
        name: 'pause',
        message: `\nPresione ${'ENTER'.bgCyan} para continuar\n`
    }
];

const inquirerMenu = async () => {
    console.clear();

    console.log('============================'.green);
    console.log('    Seleccione una opción'.white);
    console.log('============================\n'.green);

    const { opt }= await inquirer.prompt(questions);

    return opt;
};

const inquirerPause = async () => {
    console.log('\n');
    await inquirer.prompt(continueByEnter); 
};

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate: (value) => {
                if (value.length === 0)  return 'Debe ingresar un valor';

                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)

    return desc;
}

const toDeleteList = async ( tasks = []) => {
    const choices = tasks.map((task, index) => {   
        return {
                    value: task.id,
                    name: `${(index + 1 + '.').green} ${task.desc}`
                }
    });

    choices.push({
        value: '0',
        name: `${'0.'.green} Cancelar`
    })

    const question = [
        {
            type: 'list',
            name: 'id',
            message: 'Elija la tarea que desea borrar\n',
            choices
        }
    ];

    const { id }= await inquirer.prompt(question);

    return id;
}

const inquirerConfirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'confirm',
            message,
        }
    ];

    const { confirm } = await inquirer.prompt(question);

    return confirm;
}

const checkList = async ( tasks = [], message) => {
    const choices = tasks.map((task, index) => {   
        return {
                    value: task.id,
                    name: `${(index + 1 + '.').green} ${task.desc}`,
                    checked: task.completedAt ? true : false
                }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'idsArr',
            message,
            choices
        }
    ];

    const { idsArr }= await inquirer.prompt(question);

    return idsArr ;
}

module.exports = {
    inquirerMenu,
    inquirerPause,
    readInput,
    toDeleteList,
    inquirerConfirm,
    checkList
}