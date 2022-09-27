const { create_products } = require('../../models/products')

module.exports = async (req, res) => {
    try {   
    	const products_data = req.body
		const result = await create_products(products_data)

        if (process.env.MODE === 'dev') 
            console.log('[POST] Request to products is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[POST] Request to products is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    