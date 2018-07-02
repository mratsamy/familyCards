'use strict';
const { promisify } = require('util')

const getUserObjects = promisify((dbConnection, callback) => {
    dbConnection.execute(`
        SELECT
            u.id,
            u.firstName,
            u.lastName,
            u.username,
            u.email,
            IFNULL(g.total, 0) as total,
            IFNULL(g.gamesWon, 0) as gamesWon
        FROM
            User as u
        LEFT JOIN (
            SELECT
                SUM(winnings) as total,
                COUNT(*) as gamesWon,
                userId
            FROM
                Game
            WHERE
                date >= MAKEDATE(EXTRACT(YEAR FROM CURDATE()), 1)
            GROUP BY
                userId
        ) as g on u.id = g.userId
        ORDER BY
            total desc, u.lastName, u.firstName`, [], (error, results) => {
                if (error) return callback(error)
                callback(null, JSON.parse(JSON.stringify(results)))
            })
})

function checkEmail(error, done) {
    let email = this.email;
    if (email.length === 0) error()
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
    if (!re.test(email)) error()
    done()
}

module.exports = function(User) {
    User.validatesPresenceOf("firstName", "lastName", "email")
    User.validatesLengthOf("password", {min: 8, message: {min: "Password is too short."}})
    User.validatesUniquenessOf("email", {message: "Email address is not unique."})
    User.validateAsync("email", checkEmail, {message: "Not a valid email address."})

    User.initialState = async function(callback) {
        try {
            let users = await getUserObjects(User.app.datasources.db.connector)
            return callback(null, users)
        } catch (e) {
            return callback({statusCode: 400, message: "Unable to retrieve data."})
        }
    }

    User.afterRemote('initialState', function(ctx, user, next) {
        User.findById(ctx.req.accessToken.userId, {include: 'roles'})
            .then(results => {
                ctx.result['id'] = results.id
                ctx.result['firstName'] = results.firstName
                ctx.result['lastName'] = results.lastName
                ctx.result['email'] = results.email
                ctx.result['username'] = results.username || ""
                ctx.result['isAdmin'] = results.roles().findIndex(({name: roleName}) => roleName.toLowerCase() == 'admin') >= 0 ? true:false
                next()
            })
            .catch(e => next())
    })

    User.adminCreate = (userId, callback) => {
        const { Role, RoleMapping } = User.app.models
        Role.findOne({"name": "admin"})
            .then(role => {
                role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: userId
                })
            })
            .then(done => callback(null, {statusCode: 201}))
            .catch(e => callback({statusCode: 400, message: "An error occured while attempting to save."}))
    }

    User.adminDelete = (userId, callback) => {
        const { Role, RoleMapping } = User.app.models

        Role.findOne({'name': 'admin'})
            .then(role => {
                role.principals({principalType: RoleMapping.USER, principalId: userId})
            })
            .then(principals => {
                principals.forEach(principal => {
                    if(principal.principalType != RoleMapping.USER) return
                    if(principal.principalId != userId) return

                    principal.remove()
                })

                User.findByIdWithRoles(userId)
                    .then(user => callback(null, user))
            })
            .catch(error => callback({statusCode:400, message: "Unable to delete user role."}))
    }
};
