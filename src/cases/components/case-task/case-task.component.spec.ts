import { CaseTaskComponent } from './case-task.component';
import { Task } from '../../../work-allocation-2/models/tasks';
import { LetContext } from '@hmcts/rpx-xui-common-lib';

describe('CaseTaskComponent', () => {
    const sessionStorage = jasmine.createSpyObj('sessionStorage', ['getItem']);
    const component = new CaseTaskComponent(sessionStorage);
    it('getManageOptions no assignee no permissions', () => {
        const task: Task = {
                        assignee: null,
                        assigneeName: '',
                        permissions: [],
                        id: null,
                        case_id: null,
                        caseName: null,
                        caseCategory: null,
                        location: null,
                        taskName: null,
                        dueDate: new Date(),
                        actions: [],
                        warnings: false,
                        derivedIcon: null
                    };
        task.assignee = null;
        task.permissions = [];
        let options = component.getManageOptions(task);
        expect(options).toEqual([]);
        task.permissions = ['Manage'];
        options = component.getManageOptions(task);
        expect(options).toEqual([]);
    });

    it('getManageOptions no assignee with Own, Execute, Manage', () => {
        const task: Task = {
                        assignee: null,
                        assigneeName: '',
                        permissions: ['Own', 'Execute', 'Manage'],
                        id: null,
                        case_id: null,
                        caseName: null,
                        caseCategory: null,
                        location: null,
                        taskName: null,
                        dueDate: new Date(),
                        actions: [],
                        warnings: false,
                        derivedIcon: null
                    };
        task.assignee = null;
        let options = component.getManageOptions(task);
        console.log(options);
        expect(options[0].text).toEqual('Assign to me');
        task.permissions = ['Own'];
        options = component.getManageOptions(task);
        expect(options[0].text).toEqual('Assign to me');
        task.permissions = ['Execute'];
        options = component.getManageOptions(task);
        expect(options[0].text).toEqual('Assign to me');
    });

    it('getManageOptions assignee TaskAssignedToCurrentUser', () => {
        const task: Task = {
            assignee: '3314e308-e83b-4f39-a414-6844e185e5ac',
            assigneeName: 'Some Name',
            permissions: ['Own', 'Execute', 'Manage'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        const spyOnIsTaskAssignedToCurrentUser = spyOn(component, 'isTaskAssignedToCurrentUser');
        spyOnIsTaskAssignedToCurrentUser.and.returnValue(true);
        const options = component.getManageOptions(task);
        expect(options.length).toEqual(2);
        expect(options[0].text).toEqual('Reassign task');
        expect(options[1].text).toEqual('Unassign task');
    });

    it('getManageOptions assignee Task not AssignedToCurrentUser with Execute and Manage permissions', () => {
        const task: Task = {
            assignee: '3314e308-e83b-4f39-a414-6844e185e5ac',
            assigneeName: 'Some Name',
            permissions: ['Own', 'Execute', 'Manage'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        const spyOnIsTaskAssignedToCurrentUser = spyOn(component, 'isTaskAssignedToCurrentUser');
        spyOnIsTaskAssignedToCurrentUser.and.returnValue(false);
        const options = component.getManageOptions(task);
        expect(options.length).toEqual(3);
        expect(options[0].text).toEqual('Assign to me');
        expect(options[1].text).toEqual('Reassign task');
        expect(options[2].text).toEqual('Unassign task');
    });

    it('getManageOptions assignee Task not AssignedToCurrentUser with Manage but not Execute permissions', () => {
        const task: Task = {
            assignee: '3314e308-e83b-4f39-a414-6844e185e5ac',
            assigneeName: 'Some Name',
            permissions: ['Own', 'Manage'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        const spyOnIsTaskAssignedToCurrentUser = spyOn(component, 'isTaskAssignedToCurrentUser');
        spyOnIsTaskAssignedToCurrentUser.and.returnValue(false);
        const options = component.getManageOptions(task);
        expect(options.length).toEqual(2);
        expect(options[0].text).toEqual('Reassign task');
        expect(options[1].text).toEqual('Unassign task');
    });

    it('getManageOptions assignee Task not AssignedToCurrentUser with no Manage and no Execute permissions', () => {
        const task: Task = {
            assignee: '3314e308-e83b-4f39-a414-6844e185e5ac',
            assigneeName: 'Some Name',
            permissions: ['Own'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        const spyOnIsTaskAssignedToCurrentUser = spyOn(component, 'isTaskAssignedToCurrentUser');
        spyOnIsTaskAssignedToCurrentUser.and.returnValue(false);
        const options = component.getManageOptions(task);
        expect(options.length).toEqual(0);
    });

    it('isTaskAssignedToCurrentUser when no userDetails in sessionStorage', () => {
        const task: Task = {
            assignee: '3314e308-e83b-4f39-a414-6844e185e5ac',
            assigneeName: 'Some Name',
            permissions: ['Own'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        const result = component.isTaskAssignedToCurrentUser(task);
        expect(result).toBeFalsy();
    });

    it('isTaskAssignedToCurrentUser when user is assigned to task', () => {
        const task: Task = {
            assignee: '44d5d2c2-7112-4bef-8d05-baaa610bf463',
            assigneeName: 'Some Name',
            permissions: ['Own'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        sessionStorage.getItem.and.returnValue('{\"sub\":\"juser8@mailinator.com\",\"uid\":\"44d5d2c2-7112-4bef-8d05-baaa610bf463\",\"roles\":[\"caseworker\",\"caseworker-ia\",\"caseworker-ia-iacjudge\"],\"name\":\"XUI test Judge\",\"given_name\":\"XUI test\",\"family_name\":\"Judge\",\"token\":\"\"}');
        const result = component.isTaskAssignedToCurrentUser(task);
        expect(result).toBeTruthy();
    });
    it('getAssigneeName should return correctName', () => {
        const task: Task = {
            assignee: '44d5d2c2-7112-4bef-8d05-baaa610bf463',
            assigneeName: 'Some Name',
            permissions: ['Own'],
            id: null,
            case_id: null,
            caseName: null,
            caseCategory: null,
            location: null,
            taskName: null,
            dueDate: new Date(),
            actions: [],
            warnings: false,
            derivedIcon: null
        };
        let name = component.getAssigneeName(task);
        expect(name).toEqual('Some Name');

        task.assigneeName = null;
        name = component.getAssigneeName(task);
    });
});
