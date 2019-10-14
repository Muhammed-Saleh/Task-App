const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    password: {
        type:String,
        required:true,
        trim:true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('your password should n\'t includes the word \' password \' ');
            }else if (value.length < 6) {
                throw new Error('your password should be more than 6 characters');
            }
        }
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('invald email');
            }
        }
    },
    age: {
        type: Number,
        default:0
    },
    tokens: [{
        token: {
            type:String,
            required:true
        }
    }]

})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'Thisismynewsite')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email:email })

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user
}

//Hash the plain text password before saving
userSchema.pre('save', async function (next)  {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    console.log('user saved')

    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User