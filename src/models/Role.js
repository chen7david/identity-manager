const Model = require('./Model')

class Role extends Model {
    
    static get relationMappings(){   
        
        const User = require('./User')
        
        return {
            users:{
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join:{
                    from:'roles.id',
                    to:'users.id',
                    through:{
                        from:'user_roles.role_id',
                        to:'user_roles.user_id'
                    }
                }
            }, 
        }
    }
}

module.exports = Role