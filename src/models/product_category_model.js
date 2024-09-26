const {Schema,model} = require('mongoose');

const productCategorySchema = new Schema({

    title: {type:String,required: [true,'title is required']},
    description:{type:String,default:''},
    updatedOn:{type:Date},
    createdOn:{type:Date}
});

productCategorySchema.pre('save',function(next){
    this.updateOn = new Date();
    this.createdOn = new Date();
    next();
});

productCategorySchema.pre(['update','findOneAndUpdate','updateOne'],function(next){
    const update = this.getUpdate();
    delete update._id;
    this.updateOn = new Date();
    next();
});

const ProductCategoryModel = model('Category',productCategorySchema);
module.exports = ProductCategoryModel;
