const User = require('../models/User')

// handle Errors
const handleErrors = (err) => {
    console.log(err.message,err.code)
    let error = {email : '',password:''};

    //duplicate error code
    if(err.code === 11000){
        error.email = 'That email is already registered '
        return error;
    }

    //validation error
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties)
            error[properties.path] = properties.message;
        })
    }

    return error;
}

module.exports.signup_get = (req,res) => {
    res.render('signup');
}
module.exports.login_get = (req,res) => {
    res.render('login');
}
module.exports.signup_post = async(req,res) => {
    const {email , password} = req.body;

    try{
        const user = await User.create({email , password})
        res.status(201).json(user);
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors})
    }
}
module.exports.login_post = async(req,res) => {
     const {email , password} = req.body;
     
}