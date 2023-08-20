const User = require('../../../models/user');

const jwt = require('jsonwebtoken');



module.exports.createSession = async (req, res) => {
  try {
    const user = await User.findOne({email:req.body.email});
    if(!user || user.password != req.body.password){
        return res.json(422,{
            message:'Invalid username or password'
        })
    }
    return res.json(200,{
        message:'sign in successful, here is your token, please keep it safe ',
        token:jwt.sign(user.toJSON(), 'codeial',{expiresIn:'100000'})
    })

  } catch (error) {
    console.log('*****',error);
    return res.json(500,{
        message:'Internal server error'
    })
  }

}