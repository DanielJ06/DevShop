const bcrypt = require('bcryptjs')

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}

const initialUser = db => async (id) => {
    const count = await db('user').count('id as total')
    if(count[0].total === 0){
        const user = {
            name: 'admin',
            email: 'admin@devshop.com',
            passwd: generatePassHash('admin'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'Admin.Financial,Customer'
        }
        await db('user').insert(user)
    }
}

const login = db => async(email, passwd) => {
    const user = await db('user').select('*').where('email', email)
    if(user.length === 0){
        throw new  Error('Invalid user')
    }
    
    if(!bcrypt.compareSync(passwd, user[0].passwd)){
        throw new  Error('Invalid password')
    }
    return user[0] 
}

module.exports = {
    initialUser,
    login
}