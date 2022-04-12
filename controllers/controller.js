const { getHome } = require('./home')
const {
  getArticle,
  newArticleForm,
  publishArticle,
  editArticle,
  updateArticle,
  deleteArticle
} = require('./articles')

module.exports = {
  getHome,
  getArticle,
  newArticleForm,
  publishArticle,
  editArticle,
  updateArticle,
  deleteArticle
}