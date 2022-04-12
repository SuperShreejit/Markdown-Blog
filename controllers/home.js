const { StatusCodes } = require('http-status-codes')

const Article = require('../models/articles')

let status = StatusCodes.INTERNAL_SERVER_ERROR
let errMsg = ''

const getHome = async (req, res) => {
  try {
    const allArticles = await Article.find({}).sort({
      publishDate: 'desc'
    })
    if (allArticles.length == 0) {
      status = StatusCodes.NOT_FOUND
      errMsg = 'Sorry no Articles were found'
      throw new Error()
    }

    res.status(StatusCodes.OK).render('../views/home', {
      title: 'BLOG | Home',
      allArticles
    })
  } catch (error) {
    res.status(status).render('../views/home', {
      title: 'BLOG | Home',
      errMsg
    })
  }
}

module.exports = { getHome }