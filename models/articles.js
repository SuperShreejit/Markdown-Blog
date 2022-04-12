const mongoose = require('mongoose')
const slugify = require('slugify')
const { marked } = require('marked')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')

const dompurify = createDomPurify(new JSDOM().window)

const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Articles must have a title']
  },
  publishDate: {
    type: Date,
    required: true,
    default: new Date()
  },
  content: {
    type: String,
    required: [true, 'Articles must have Contents']
  },
  description: {
    type: String,
    required: [true, 'Articles must havea description']
  },
  author: {
    type: String,
    required: [true, 'Articles must have an author']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  }
}, { timestamps: true })


ArticleSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    })
  }

  if (this.content) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.content))
  }

  next()
})


module.exports = mongoose.model('Article', ArticleSchema)