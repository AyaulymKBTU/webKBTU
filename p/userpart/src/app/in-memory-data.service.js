"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var heroes = [
            { id: 1, name: 'Mr. Nice', task: 'task1', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 2, name: 'Narco', task: 'task41', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 3, name: 'Bombasto', task: 'task561', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 4, name: 'Celeritas', task: 'task211', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 5, name: 'Magneta', task: 'task134', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 6, name: 'RubberMan', task: 'task13', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 7, name: 'Dynama', task: 'task11', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 8, name: 'Dr IQ', task: 'task1222', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 9, name: 'Magma', task: 'task122', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' },
            { id: 10, name: 'Tornado', task: 'task12', dateS: '24.01.17', dateF: '31.02.17', pfd: '24.02.17' }
        ];
        return { heroes: heroes };
    };
    InMemoryDataService.prototype.createDbs = function () {
        var ProjTask = [
            { Id: 1, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 1, TaskStatusId: 1 },
            { Id: 2, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 1, TaskStatusId: 2 },
            { Id: 3, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 1, TaskStatusId: 1 },
            { Id: 4, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 2, TaskStatusId: 1 },
            { Id: 5, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 2, TaskStatusId: 1 },
            { Id: 6, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 3, TaskStatusId: 1 },
            { Id: 7, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 3, TaskStatusId: 1 },
            { Id: 8, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 4, TaskStatusId: 1 },
            { Id: 9, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 5, TaskStatusId: 1 },
            { Id: 10, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 5, TaskStatusId: 1 },
            { Id: 11, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 6, TaskStatusId: 1 },
            { Id: 12, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 6, TaskStatusId: 1 },
            { Id: 13, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 7, TaskStatusId: 1 },
            { Id: 14, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 8, TaskStatusId: 1 },
            { Id: 15, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 9, TaskStatusId: 1 },
            { Id: 16, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 9, TaskStatusId: 1 },
            { Id: 16, Title: 'task1', Description: 'asdasd', DateS: '21.01.2017', dateF: '31.02.2017', pfd: '24.02.17', ProjectId: 10, TaskStatusId: 1 },
        ];
        return { ProjTask: ProjTask };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//: ProjectTask[] = 
//# sourceMappingURL=in-memory-data.service.js.map