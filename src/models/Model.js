const { Model } = require('objection')
const knexfile = require('./../../knexfile')
const Knex = require('knex')(knexfile)
const OM = require('objection-mixin')
Model.Knex(Knex)

class BaseModel extends OM(Model) {

    $formatJson(json) {
        json = super.$formatJson(json)
        delete json.user_id
        delete json.password
        return json
    }
}

module.exports = BaseModel
