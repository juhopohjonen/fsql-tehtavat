const { ReadingList } = require('../models')
const ReadStatus = require('../models/ReadStatus')
const UserReadingLists = require('../models/UserReadingLists')

const readingListRouter = require('express').Router()

readingListRouter.post('/', async (req, res) => {
    const { user_id, blog_id } = req.body

    const readStatus = new ReadStatus({
        read: false
    })

    await readStatus.save()

    const readingList = new ReadingList({
        userId: user_id,
        blogId: blog_id,
        readstatusId: readStatus.id
    })

    await readingList.save()

    const readingListUser = new UserReadingLists({
        userId: user_id,
        readinglistId: readingList.id
    })
    
    await readingListUser.save()


    return res.json(readingList)
})

readingListRouter.put('/:id', async (req, res) => {
    const { id } = req.params
    if (typeof req.body.read !== 'boolean') {
        return res.status(400).end()
    }

    const readingList = await ReadingList.findOne({
        where: {
            id: id
        }
    })



    const readStatus = await ReadStatus.findOne({
        where: {
            id: readingList.readstatusId
        }
    })

    if (!readingList || !readStatus) {
        return res.status(404).end()
    }

    readStatus.read = req.body.read

    await readStatus.save()

    return res.json(readStatus)


})

module.exports = readingListRouter