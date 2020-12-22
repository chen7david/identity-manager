const { Role } = require('../models')

const roles = [
    {
        name: 'admin',
        description: 'complete access to all systems'
    },
    {
        name: 'moderator',
        description: 'complete access to all systems'
    },
]

const run = async () => {
    try {
        await Role.query().insert(roles)
        console.log('roles table has been seeded!')
        process.exit()
    } catch (err) {
        console.log('seed failed: ', err)
        process.exit()
    }
}
run()
