const ProductModel = require("../models/product_model");

const ProductController = {

    //For Creating Product 
    createProduct: async function(req,res){
        try{
         const productData =  req.body;
         const newProductData = ProductModel(productData);
         await newProductData.save();
         return res.json({success:true,message:"Product has been created.",data:newProductData});
        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    },

    //For Fetching all Products

    fetchAllProduct: async function(req,res){
        try{
            const fetchProduct = await ProductModel.find();
            return res.json({
                success:true,data:fetchProduct
            });
        }
        catch(ex){
            return res.json({success:false,message:ex});
        }

    },

    fetchProductById: async function(req,res){
        try{
            const id = req.params.id;
            const foundProductById = await ProductModel.findById(id);
            if(!foundProductById){
                return res.json({success:false,message:"Product is not available"});
            }
            return res.json({success:true,data:foundProductById});

        }
        catch(ex){
            return res.json({success:false,message:ex});
        }

    }

};
module.exports = ProductController;

