const ProductCategoryModel = require("../models/product_category_model");

const ProductCategoryController = {
    //For Creating Product Category
    createProductCategory: async function(req,res){
        try{
            const productCategoryData = req.body;
            const newProductCategory = new ProductCategoryModel(productCategoryData);
            await newProductCategory.save();
            return res.json({success:true,message:"Product Category Created",data:newProductCategory})
            
        }
        catch(ex){
            return res.json({success:false,message:ex})
        }
    },
    //For Getting all product category

    fetchAllProductCategory: async function(req,res){
        try{
            const productCategories = await ProductCategoryModel.find();
          return res.json({success:true,data:productCategories});
}
        catch(ex){
            return res.json({success:false,message:ex});

        }
    },
    fetchProductCategoryById: async function(req,res){
        try{
            const id = req.params.id;
            const foundProductCategories = await ProductCategoryModel.findById(id);
            if(!foundProductCategories){
                return res.json({success:false,message:"Product Category not found."});
              }
          return res.json({success:true,data:foundProductCategories});
          

        }
        catch(ex){
            return res.json({success:false,message:ex});

        }
    }

};
module.exports = ProductCategoryController;

