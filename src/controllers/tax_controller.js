const TaxModel = require("../models/tax_model");

const TaxController = {
    //create tax category

    createTaxCategory: async function(req,res){
        try{
            const taxCategoryData = req.body;
            const newTaxCategoryData = new TaxModel(taxCategoryData);
            await newTaxCategoryData.save();
            return res.json({success:true,message:"Tax category has been created successfully",data:newTaxCategoryData});

        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    },

    //Fetch All Tax Category

    fetchAllTaxCategory: async function(req,res){

        try{
            const taxCategory = await TaxModel.find();
            return res.json({success:true,data:taxCategory});

        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    },

    //fetch tax category by id
    fetchTaxCategoryById: async function(req,res){
        try{
            const id = req.params.id;
            const foundTaxCategory = new TaxModel.findById(id);
            if(!foundTaxCategory){
                return res.json({success:false,message:"Tax category not found"});
            }
            return res.json({success:true,data:foundTaxCategory});


        }
        catch(ex){
            return res.json({success:false,message:ex});
        }
    }
};
module.exports = TaxController;

