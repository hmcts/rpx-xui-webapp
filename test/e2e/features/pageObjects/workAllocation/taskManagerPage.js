const TaskList = require('./taskListTable');

class TaskManagerPage extends TaskList{
   
    async isTableDisplayed(){
        return await this.table.isPresent();
    }
}