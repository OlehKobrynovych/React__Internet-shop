const { get_all_shops } = require('../../models/shops')

module.exports = async (req, res) => {
    try {   
    	const result = await get_all_shops()

        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to shops is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to shops is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    