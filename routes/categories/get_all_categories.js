const { get_all_categories } = require('../../models/categories')

module.exports = async (req, res) => {
    try {   
        const shop_id = req.params.id
    	const result = await get_all_categories(shop_id)

        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to categories is successfully processed')

        const parentCategories = result.filter((parentCategory) => {
            return parentCategory.parent_id == 'null'
        })

        const resData = parentCategories.map((parentCategory) => {
            
            return {
                ...parentCategory._doc,
                sub_categories: result.filter((subCategory) => {
                    return subCategory.parent_id == parentCategory._id
                })
            }
        })

        return res.status(201).send({
            success: true, 
            data: resData
        })
    } catch (error) {
        if (process.env.MODE === 'dev') 
            console.log('[GET-ALL] Request to categories is failed')

        return res.status(400).send({
            success: false,
            error
        })
    }
}
    