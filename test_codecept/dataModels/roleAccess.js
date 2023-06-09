const { v4 } = require('uuid');


class RoleAccessDataModel{


    getCaseRole(){

        return {
            actions: [
                { 'id': 'reallocate', 'title': 'Reallocate' },
                { 'id': 'remove', 'title': 'Remove Allocation' },
            ],
            actorId: v4(),
            email: "",
            end: "",
            id: v4(),
            roleId: v4(),
            location: null,
            name: "",
            roleCategory: "",
            roleName: "",
            start: "",
            created: "",
            notes: 'No reason for case access given',
            requestedRole: null,
        }
    }

}

module.exports = new RoleAccessDataModel();
