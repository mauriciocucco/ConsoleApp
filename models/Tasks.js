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

    showTasksList(list = this.listArr, filtered = false) {
        if(list.length === 0 && filtered){
            return console.log('\nNo hay tareas'.magenta);
        }

        list.forEach((task, index) => {
            const indexStr = `${(index + 1 + '.').green}`;

            console.log(`${indexStr} ${task.desc} :: ${!task.completedAt ? 'Pendiente'.red : (filtered)? `${task.completedAt}`.green : 'Completada'.green}`);
        })
    }

    filterTasksList(completed = true) {
        const filteredList = completed ? this.listArr.filter(task => task.completedAt) : this.listArr.filter(task => !task.completedAt);

        this.showTasksList(filteredList, true);
    }

    deleteTask(id = '') {
        if(this._list[id]) {
            delete this._list[id];

            return true;
        }

        return false
    }

    changeTasksStatus(idsArr = []) {
        idsArr.forEach(id => {
            if(this._list[id] && !this._list[id].completedAt) {
                this._list[id].completedAt = new Date().toISOString();
            }
        })

        this.listArr.forEach(task => {
            if(!idsArr.includes(task.id)) {
                this._list[task.id].completedAt = null;
            }
        })
    }
}

module.exports = Tasks;