const Task = require("./task");

class Tasks {
    _list = {}
    get listArr() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            list.push(this._list[key]);
        })

        return list;
    }

    constructor() {}

    createTask( desc = '' ) {
        const task = new Task( desc );
        this._list[ task.id ] = task;

        return task;
    }

    finalList() {
        this.listArr.map((task, index) => {
            const indexStr = task.completedAt ? `${(index + 1 + '.').green}` : `${(index + 1 + '.').red}`;

            console.log(`${indexStr} ${task.desc} :: ${task.completedAt ? `${'Completada'.green}` : `${'Pendiente'.red}`}`);
        })
    }
}

module.exports = Tasks;