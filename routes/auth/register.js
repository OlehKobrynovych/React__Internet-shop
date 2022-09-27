const { get_user_by_email, create_user } = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/*

We will:

Get user input from the /register route.
Verify the user's input.
Check to see if the user has already been created.
Protect the user's password by encrypting it.
Make a user account in our database.
Finally, construct a JWT token that is signed.

*/

module.exports = async (req, res) => {
   // Our register logic starts here

   try {

    // Get user input
    const { firstName, lastName, email, password } = req.body

    // Validate user input
    if (!(email && password && firstName && lastName)) {
        res.status(400).send({
            success: false,
            message: "All input is required"
        })
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await get_user_by_email(email)

    if (oldUser) {
        return res.status(409).send({
            success: false,
            message: "User Already Exist. Please Login"
        })
    }

    //Encrypt user password
    encryptedUserPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    const user = await create_user({
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(), // sanitize
      password: encryptedUserPassword,
    })

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "5h",
      }
    )

    // save user token
    user.token = token

    // return new user
    res.status(201).json({
        success: true,
        data: user
    })
  } catch (error) {
    if (process.env.MODE === 'dev') 
        console.log('[POST] Rregister request is failed')

    return res.status(400).send({
        success: false,
        error
    })
  }

  // Our register logic ends here
}