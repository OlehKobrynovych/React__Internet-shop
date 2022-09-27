const { get_user_by_email } = require('../../models/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/*

We will:

Get user input for the /login route.
Verify the user's input.
Check to see if the user is genuine.
Compare the user's password to the one we saved earlier in our database.
Finally, construct a JWT token that is signed.

*/

module.exports = async (req, res) => {
    // Our login logic starts here

    try {

        // Get user input
        const { email, password } = req.body
    
        // Validate user input
        if (!(email && password)) {
            res.status(400).send({
                success: false,
                message: "All input is required"
            })
        }

        // Validate if user exist in our database
        const user = await get_user_by_email(email)
    
        if (user && (await bcrypt.compare(password, user.password))) {

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "5h",
            }
        );
    
        // save user token
        user.token = token
    
            // user
            return res.status(200).json({
                success: true,
                data: user
            })
        }

        return res.status(400).send({
            success: false,
            message: "Invalid Credentials"
        })
        
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[POST] Rregister request is failed')
    
        return res.status(400).send({
            success: false,
            error
        })
    }

    // Our login logic ends here
}