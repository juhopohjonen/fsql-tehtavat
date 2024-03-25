const { Sequelize } = require("sequelize");
const { DB_URI } = require("./config");
const { Umzug, SequelizeStorage } = require("umzug");

const sequelize = new Sequelize(DB_URI)

const migratorConfig = {
    migrations: {
        glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console
}

const runMigrations = async () => {
    const migrator = new Umzug(migratorConfig)

    const migrations = await migrator.up()
    console.log('up to date', {
        files: migrations.map((mig) => mig.name)
    })
}

const rollbackMigration = async () => {
    await sequelize.authenticate()
    const migrator = new Umzug(migratorConfig)
    await migrator.down()
}

const connectToDb = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('Db authenticated successfully')
    } catch (e) {
        console.error('Db connection failed by error', e)
        return process.exit(1)
    }
}

module.exports = {
    connectToDb,
    sequelize,
    rollbackMigration
}