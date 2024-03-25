const Blog = require('./Blog')
const ReadStatus = require('./ReadStatus')
const ReadingList = require('./ReadingLists')
const User = require('./User')
const Session = require('./Session')
const UserReadingLists = require('./UserReadingLists')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(ReadingList, { through: UserReadingLists })
ReadingList.belongsToMany(User, { through: UserReadingLists })

// Blog.hasMany(ReadingList)
ReadingList.belongsTo(Blog)

ReadStatus.hasOne(ReadingList)
ReadingList.belongsTo(ReadStatus)

module.exports = {
    Blog,
    User,
    ReadingList,
    Session
}