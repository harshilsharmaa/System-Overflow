var moment  = require('moments');

module.exports = {
    formatDate: function (date, format){
        return moment(date).format(format)
    },
}