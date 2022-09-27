const { get_all_products } = require('../../models/products')

module.exports = async (req, res) => {
    try {   
    	const result = await get_all_products()

        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to products is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to products is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    