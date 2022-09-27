const { update_products } = require('../../models/products')

module.exports = async (req, res) => {
    try {   
    	const products_id = req.params.id
		const products_data = req.body
		const result = await update_products(products_id, products_data)

        if (process.env.MODE === 'dev') 
            console.log('[PUT] Request to products is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[PUT] Request to products is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    