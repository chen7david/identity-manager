const { Model } = require('objection')
const knexfile = require('./../../knexfile')
const Knex = require('knex')(knexfile)
Model.Knex(Knex)

class BaseModel extends Model {

    $formatJson(json) {
        json = super.$formatJson(json)
        delete json.user_id
        delete json.password
        return json
    }
}

module.exports = BaseModel
