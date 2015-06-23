module.exports = {
    '/api/v1/users': {
        default: {
            data: [
                {name: 'Name1'},
                {name: 'Name2'}
            ],
            headers: {
                XTagNext: '1234'
            }
        },
        blank: {
            data: []
        },
        increase: {
            data: [
                {name: 'Name1'},
                {name: 'Name2'},
                {name: 'Name3'},
                {name: 'Name4'}
            ]
        }
    }
};