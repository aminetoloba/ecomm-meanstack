const Product = require("./../db/product");
const mongoose = require('mongoose');
const { Types } = require('mongoose');

async function addProduct(model){
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id, model){
    await Product.findByIdAndUpdate(id,model);
}
async function deleteProduct(id){
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){
    let products =await Product.find();
    return products.map(x=>x.toObject());
}

async function getProduct(id){
    let product = await Product.findById(id);
    return product.toObject();
}



async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true,
    });
    return newProducts.map((x) => x.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({
        isFeatured: true,
    });
    return featuredProducts.map((x) => x.toObject());
}

async function getProductForListing(
    searchTerm, 
    categoryId, 
    page, 
    sortBy, 
    sortOrder,
    brandId,
    pageSize, 
    
 ){
    console.log("***vérification de la fonction")
    page = parseInt(page) || 1;
    pageSize = parseInt(pageSize) || 10;
    
    if(!sortBy || typeof sortBy !== 'string'){
        sortBy='price'
    }
    if(!sortOrder || (sortOrder !== '1' && sortOrder !== '-1')){
        sortOrder=-1;  
    }
    let queryFilter = {};
    if(searchTerm){
        queryFilter.$or=[{
            name: {$regex: '.*'+searchTerm+'.*'}
        },
        {
            shortDescription: {$regex: '.*'+searchTerm+'.*'}
        },
    ];
    }
    if(categoryId && Types.ObjectId.isValid(categoryId)){
        console.log("**categoryId converti", categoryId);
        
        queryFilter.categoryId= new Types.ObjectId(categoryId);
        console.log("queryFilter avec category",queryFilter);  
    }
    console.log("**-----brandId**-----", brandId);
    if(brandId && Types.ObjectId.isValid(brandId)){
        queryFilter.brandId= new Types.ObjectId(brandId);
        console.log("**queryFilter avec marque**",queryFilter);  
    }
    console.log("**categoryId:**", categoryId);
    console.log("**brandId:**", brandId);
    console.log("queryFilter",queryFilter);
    
    const products = await Product.find(queryFilter)
    .sort({
        [sortBy]: +sortOrder,
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);
    return products.map(x=>x.toObject());
}
module.exports = { 
    addProduct,
    updateProduct, 
    deleteProduct, 
    getAllProducts, 
    getProduct,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing
 };