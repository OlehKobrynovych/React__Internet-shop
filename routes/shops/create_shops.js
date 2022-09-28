const { create_shops } = require('../../models/shops')

module.exports = async (req, res) => {
    try {   
    	const shops_data = req.body
        console.log(shops_data)
		const result = await create_shops(shops_data)

        if (process.env.MODE === 'dev') 
            console.log('[POST] Request to shops is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[POST] Request to shops is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    