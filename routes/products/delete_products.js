const { delete_products } = require('../../models/products')

module.exports = async (req, res) => {
    try {   
    	const products_id = req.params.id
		const result = await delete_products(products_id)

        if (process.env.MODE === 'dev') 
            console.log('[DELETE] Request to products is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[DELETE] Request to products is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    