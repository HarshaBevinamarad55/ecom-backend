const WishListItem = require("../models/WishListItem");
const Product = require("../models/Product");
const addToWishList = async (req, res) => {
try {
const { productId} = req.body;
const product= await Product.findById(productId);
if (!product) {
return res.status(404).json({ message: "Product not found", });
}
const exists = await WishListItem.findOne({
userId: req.user.id, productId,
});
if (exists) {
return res.status(400).json({ message: "Product already exist in wishlist", });
}
const wishListItem = await WishListItem.create({
userId: req.user.id, productId,
} );
res.status(201).json({
message: "Product added to WishList", });
} catch (error) {
res.status(500).json({
message: error.message || "Internal server error",
});
}
};

const getWishList = async (req, res) => {
    try {
      const wishListitem=await WishListitem.find({
        userId:RegExp.user.id,
      }).populate("producytId");

      res.status(200).json({
        message:"wishlist fetched",
        wishList:wishListitem,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };

  const removeWishListItem = async (req, res) => {
    try {
      const {itemId}=req.params;
      await WishListItem.findByIdAndDelete(itemId);

      res.status(200).json({
        message:"item removed from the wishList",
    
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  };
  
module.exports = { addToWishList ,getWishList,removeWishListItem};