export default {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'fa fa-dashboard'
        },
        {
            title: true,
            name: 'Sidebar Items',
            wrapper: {            // optional wrapper object
                element: "span",      // required valid HTML5 element tag
                attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
            },
            class: ""             // optional class names space delimited list for title item ex: "text-center"
        },
        {
            name: 'AdminControl',
            url: '/admincntrolconsole',
            icon: 'icon-puzzle',
            children: [
                {
                    name: 'Create Machine',
                    url: '/admincntrolconsole',
                    icon: 'icon-puzzle'
                },
                {
                    name: 'Update Machine',
                    url: '',
                    icon: 'fa fa-pencil-square-o',
                    children: [
                        {
                            name: 'GenInfo Update',
                            url: '/geninfoupdate',
                            icon: 'fa fa-pencil-square-o'
                        },
                        {
                            name: 'Oper. Thre. Update',
                            url: '/operatthreupdate',
                            icon: 'fa fa-pencil-square-o'
                        },
                        {
                            name: 'Maint. Info Update',
                            url: '/maintinfoupdate',
                            icon: 'fa fa-pencil-square-o'
                        }]
                },
                {
                    name: 'Delete Machine',
                    url: '/deletemachine',
                    icon: 'fa fa-trash-o',
                    children: [
                        {
                            name: 'GenInfo Delete',
                            url: '/gneralinfodelete',
                            icon: 'fa fa-trash-o',
                        },
                        {
                            name: 'Oper. Thre. Delete',
                            url: '/operatthreupddelete',
                            icon: 'fa fa-trash-o',
                        },
                        {
                            name: 'Maint. Info Delete',
                            url: '/maintinfodelete',
                            icon: 'fa fa-trash-o',
                        }]
                }
            ]
        },

        {
            name: 'Connect Staff',

            url: '/dashboard',
            icon: 'fa fa-handshake-o'
        },
        {
            name: 'Help',
            url: '/admincntrolconsole',
            icon: 'fa fa-handshake-o'
        }
    ]
};
