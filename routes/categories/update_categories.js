const { update_categories } = require('../../models/categories')

module.exports = async (req, res) => {
    try {   
    	const categories_id = req.params.id
		const categories_data = req.body
		const result = await update_categories(categories_id, categories_data)

        if (process.env.MODE === 'dev') 
            console.log('[PUT] Request to categories is successfully processed')

        return res.status(201).send({
            success: true, 
            data: result
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[PUT] Request to categories is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    