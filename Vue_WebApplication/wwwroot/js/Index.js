var invoices = [
    { id: 1, name: 'Laravel', description: 'Provide Laravel Information.', price: 100 },
    { id: 2, name: 'AngularJS', description: 'Provide AngularJS Information.', price: 100 },
    { id: 3, name: 'PHP', description: 'Provide PHP Information.', price: 100 }
];

function findinvoice(invoiceId) {
    return invoices[findinvoiceKey(invoiceId)];
};

function findinvoiceKey(invoiceId) {
    for (var key = 0; key < invoices.length; key++) {
        if (invoices[key].id == invoiceId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#invoice-list',
    data: function () {
        return { invoices: invoices, searchKey: '' };
    },
    computed: {
        filteredinvoices: function () {
            var self = this;
            console.log()
            return self.invoices.filter(function (invoice) {
                return invoice.name.indexOf(self.searchKey) !== -1
            })
        }
    }
});

var invoice = Vue.extend({
    template: '#invoice',
    data: function () {
        return { invoice: findinvoice(this.$route.params.invoice_id) };
    }
});

var invoiceEdit = Vue.extend({
    template: '#invoice-edit',
    data: function () {
        return { invoice: findinvoice(this.$route.params.invoice_id) };
    },
    methods: {
        updateinvoice: function () {
            var invoice = this.invoice;
            invoices[findinvoiceKey(invoice.id)] = {
                id: invoice.id,
                name: invoice.name,
                description: invoice.description,
                price: invoice.price
            };
            router.push('/');
        }
    }
});

var invoiceDelete = Vue.extend({
    template: '#invoice-delete',
    data: function () {
        return { invoice: findinvoice(this.$route.params.invoice_id) };
    },
    methods: {
        deleteinvoice: function () {
            invoices.splice(findinvoiceKey(this.$route.params.invoice_id), 1);
            router.push('/');
        }
    }
});

var Addinvoice = Vue.extend({
    template: '#invoice-add',
    data: function () {
        return {
            invoice: { name: '', description: '', price: '' }
        }
    },
    methods: {
        createinvoice: function () {
            var invoice = this.invoice;
            invoices.push({
                id: Math.random().toString().split('.')[1],
                name: invoice.name,
                description: invoice.description,
                price: invoice.price
            });
            router.push('/');
        }
    }
});

var router = new VueRouter({
    routes: [{ path: '/', component: List },
    { path: '/invoice/:invoice_id', component: invoice, name: 'invoice' },
    { path: '/invoice-add', component: Addinvoice },
    { path: '/invoice/:invoice_id/edit', component: invoiceEdit, name: 'invoice-edit' },
    { path: '/invoice/:invoice_id/delete', component: invoiceDelete, name: 'invoice-delete' }
    ]
});

new Vue({
    el: '#app',
    router: router,
    template: '<router-view></router-view>'
});