// const { sendOrderConfirmationEmail } = require("../helpers/sendMail")
const { sendOrderConfirmationEmail } = require("../helpers/sendMail")
const { Category } = require("../models/category")
const { Order } = require("../models/order")
const { Product } = require("../models/product")

const handleCreateCategory = async(request, response) => {
  try {
    
    //Proceed to check if there is a category name
    if (!request.body){
      return response.status(400).json({
        success: false,
        message: "missing request body"
      })
    }
  
    const {name} = request.body
    if (!name){
      return response.status(400).json({
        success: false,
        message: "missing required fields - category name"
      })
    }
  
    const newCategory = {
      name,
    }
    // const createdProduct = Category.create(newCategory)
    const createdCategory = new Category(newCategory)
    await createdCategory.save()
    return response.status(201).json({
      success: true,
      message: 'Category created successfully',
      createdCategory
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}

const handleCreateProducts = async(request, response) => {
  try {
    
    //Proceed to check if there is a product data
    if (!request.body){
      return response.status(400).json({
        success: false,
        message: "missing request body"
      })
    }
    const {name, price, quantity, category} = request.body
    if (!name || !price || !category){
      return response.status(400).json({
        success: false,
        message: "missing required fields"
      })
    }
  
    const newProduct = {
      name,
      price,
      quantity,
      inStock: Boolean(quantity && quantity > 0),
      category
    }
    
    // const createdProduct = Product.create(newProduct)
    const createdProduct = new Product(newProduct)
    await createdProduct.save()
    return response.status(201).json({
      success: true,
      message: 'Product created successfully',
      createdProduct
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}

const handleGetAllCategories = async (request, response) => {
  try {
    const categories = await Category.find()
  
    return response.status(200).json({
      success: true,
      message: 'Categories fetched successfully',
      categories
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}

const handleGetAllProducts = async (request, response) => {
  try {
    const products = await Product.find()
  
    return response.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}

const handleGetProduct = async (request, response) => {
  try {
    const {id} = request.params
    if(!id){
      return response.status(409).json({
        success: false,
        message: 'Missing product id'
      })
    }

    const product = await Product.findById(id)
    if(!product){
      return response.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }
  
    return response.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      product
    })
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    })
  }
}

const handleCreateOrders = async (request, response) => {
  try {
    if (!request.body) {
      return response.status(400).json({
        success: false,
        message: "missing request body"
      });
    }

    const { products, shippingAddress } = request.body;
    if (!products || !Array.isArray(products) || products.length === 0 || !shippingAddress) {
      return response.status(400).json({
        success: false,
        message: "missing required fields"
      });
    }

    // Fetch all products in one query for efficiency
    const productIds = products.map(p => p.id);
    const dbProducts = await Product.find({ _id: { $in: productIds } });

    // Map for quick lookup
    const dbProductMap = {};
    dbProducts.forEach(prod => {
      dbProductMap[prod._id.toString()] = prod;
    });

    let totalAmount = 0;
    const orderedProducts = [];

    for (const item of products) {
      const dbProduct = dbProductMap[item.id];
      if (!dbProduct) {
        return response.status(404).json({
          success: false,
          message: `Product with id ${item.id} not found`
        });
      }
      if (!dbProduct.inStock || dbProduct.quantity < item.quantity) {
        // If product is not in stock or insufficient quantity
        return response.status(409).json({
          success: false,
          message: `Insufficient stock for product ${dbProduct.name}`
        });
      }
      // Update product quantity in stock
      dbProduct.quantity -= item.quantity;
      dbProduct.inStock = dbProduct.quantity > 0;
      await dbProduct.save();

      // Calculate total for this product
      totalAmount += dbProduct.price * item.quantity;
      orderedProducts.push({
        product: dbProduct._id,
        quantity: item.quantity,
        price: dbProduct.price
      });
    }
    const user = request.user

    const newOrder = {
      products: orderedProducts,
      shippingAddress,
      totalAmount,
      user: user._id
    };

    const createdOrder = new Order(newOrder);
    const savedOrder = await createdOrder.save();
    await sendOrderConfirmationEmail(user.email, user.firstName, savedOrder._id );

    return response.status(201).json({
      success: true,
      message: 'Order created successfully',
      createdOrder
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    });
  }
};

const handleGetAllOrders = async (request, response) => {
  try {
    const orders = await Order.find()
    return response.status(201).json({
      success: true,
      message: 'Orders fetched successfully',
      orders
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    });
  }
};

const handleGetUserOrders = async (request, response) => {
  try {
    const user = request.user
    const orders = await Order.find({ user: user._id })
    if (!orders || orders.length === 0) {
      return response.status(404).json({
        success: false,
        message: 'No orders found for this user'
      });
    }

    return response.status(200).json({
      success: true,
      message: 'Orders fetched successfully',
      orders
    });

  } catch (error) {
    return response.status(400).json({
      success: false,
      message: "An error occurred"
    });
  }
};

module.exports = {
  handleCreateCategory,
  handleCreateProducts,
  handleGetAllCategories,
  handleGetAllProducts,
  handleGetProduct,
  handleCreateOrders,
  handleGetAllOrders,
  handleGetUserOrders,
}