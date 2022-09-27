const { get_shops } = require('../../models/shops')

module.exports = async (req, res) => {
    try {   
    	const shops_id = req.params.id
		const result = await get_shops(shops_id)

        if (process.env.MODE === 'dev') 
            console.log('[GET] Request to shops is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[GET] Request to shops is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    