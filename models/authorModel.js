const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 100
  },
  familyName: {
    type: String,
    required: true,
    maxLength: 100
  },
  dateOfBirth: {
    type: Date,
  },
  dateOfDate: {
    type: Date,
  },
})

authorSchema.virtual('name').get(function () {
  const fullName = this.firstName + ' ' + this.familyName
  return fullName
})

authorSchema.virtual('lifeSpan').get(function () {
  let lifeSpan = ''
  if (this.dateOfBirth) {
    lifeSpan = Date.now() - this.dateOfBirth
  } else if (this.dateOfBirth && this.dateOfDate) {
    lifeSpan = this.dateOfDate - this.dateOfBirth
  }
  return lifeSpan
})

authorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id
})

module.exports = mongoose.model('Author', authorSchema)
