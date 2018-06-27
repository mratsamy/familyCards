module.exports = function(app) {
    // Update the database w/ our models, by wrapping in isActual it will check if its outdated before syncing
    app.dataSources.db.isActual(app.models, (error, actual) => {
        if (!actual) {
            console.log(`updating the database with new models`)
            app.dataSources.db.autoupdate()
        }
    })
}  