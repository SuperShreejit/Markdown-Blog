const { StatusCodes } = require('http-status-codes')

const Article = require('../models/articles')

let status = StatusCodes.INTERNAL_SERVER_ERROR

// view article
const getArticle = async (req, res) => {
  const articleSlug = req.params.slug
  try {
    const article = await Article.findOne({
      slug: articleSlug
    })
    res.status(StatusCodes.OK).render('../views/article', {
      article,
      title: `BLOG | View Article`
    })
  } catch (error) {
    console.error(error)
    res.error = error
    res.redirect('/')
  }
}

// create article form
const newArticleForm = async (req, res) => {
  res.status(StatusCodes.OK).render('../views/article/newArticle', {
    title: 'BLOG | Create Article'
  })
}

// publish article
const publishArticle = async (req, res) => {
  const {
    title, author, description, content
  } = req.body
  try {
    const newArticle = Article({
      title: title,
      author: author,
      description: description,
      content: content
    })

    const article = await Article.create(newArticle)

    if (!article) {
      status = StatusCodes.BAD_REQUEST
      throw new Error('Validation failed')
    }

    res.redirect(`/article/${article.slug}`)
  } catch (error) {
    console.error(error)
    res.error = error
    res.redirect('/article/new')
  }
}

// edit article form
const editArticle = async (req, res) => {
  const articleSlug = req.params.slug
  try {
    const article = await Article.findOne({
      slug: articleSlug
    })
    if (!article) {
      status = StatusCodes.NOT_FOUND
      throw new Error('Article not found')
    }

    res.status(StatusCodes.OK).render('../views/article/editArticle', {
      title: 'BLOG | Edit Article',
      article
    })
  } catch (error) {
    console.error(error)
    res.error = error
    res.redirect(`/article/${articleSlug}`)
  }
}

// update article
const updateArticle = async (req, res) => {
  const articleSlug = req.params.slug
  const {
    title, author, description, content
  } = req.body
  try {
    const query = {
      title: title,
      author: author,
      description: description,
      content: content
    }
    const article = await Article.findOneAndUpdate({
      slug: articleSlug
    },
      query, {
      new: true, runValidators: true
    })

    if (!article) {
      status = StatusCodes.BAD_REQUEST
      throw new Error('Validation failed')
    }

    res.redirect(`/article/${articleSlug}`)
  } catch (error) {
    console.error(error)
    res.error = error
    res.redirect(`/article/${articleSlug}`)
  }
}

// delete article
const deleteArticle = async (req, res) => {
  const articleSlug = req.params.slug
  try {
    const article = await Article.findOne({
      slug: articleSlug
    })
    if (!article) {
      status = StatusCodes.NOT_FOUND
      throw new Error('Article not found')
    }
    else {
      await Article.findOneAndRemove({
        slug: articleSlug
      })
      res.redirect(`/`)
    }
  } catch (error) {
    console.error(error)
    res.error = error
    res.redirect(`/article/${articleSlug}`)
  }
}


module.exports = {
  getArticle,
  newArticleForm,
  publishArticle,
  editArticle,
  updateArticle,
  deleteArticle
}