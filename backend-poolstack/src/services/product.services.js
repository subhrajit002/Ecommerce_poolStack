import Category from "../models/category.js";
import Product from "../models/product.js";

const createProduct = async (reqData) => {
    try {
        let topLevel = await Category.findOne({ name: reqData.topLevelCategory })
        if (!topLevel) {
            topLevel = new Category({
                name: reqData.topLevelCategory,
                level: 1,
            })
            await topLevel.save();
        }

        let secondLevel = await Category.findOne({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
        })
        if (!secondLevel) {
            secondLevel = new Category({
                name: reqData.secondLevelCategory,
                parentCategory: topLevel._id,
                level: 2,
            })
            await secondLevel.save()
        }

        let thirdLevel = await Category.findOne({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id
        })
        if (!thirdLevel) {
            thirdLevel = new Category({
                name: reqData.thirdLevelCategory,
                parentCategory: secondLevel._id,
                level: 3,
            })
            await thirdLevel.save()
        }

        const product = new Product({
            title: reqData.title,
            description: reqData.description,
            price: reqData.price,
            color: reqData.color,
            imageUrl: reqData.imageUrl,
            brand: reqData.brand,
            size: reqData.size,
            quantity: reqData.quantity,
            category: thirdLevel._id
        })
        return await product.save()
    } catch (error) {
        throw new Error(error);
    }
}

const deleteProduct = async (productId) => {
    const product = await findProductById(productId);

    if (product) {
        await Product.findByIdAndDelete(productId)
        return "product deleted successfully"
    }
}

async function updateProduct(productId, reqData) {
    return await Product.findByIdAndUpdate(productId, reqData);
}

async function findProductById(productId) {
    const product = await Product.findById(productId).populate("category").exec();

    if (!product) {
        throw new Error(`product not found with id : ${productId}`)
    }
    return product;
}

// async function getAllProducts(reqQuery) {
//     let { category, color, sizes, miniPrice, maxPrice, sort, stock, pageNumber, pageSize } = reqQuery;

//     pageSize = pageSize || 10;

//     let query = await Product.find().populate("category");

//     if (category) {
//         const existsCategory = await Category.findOne({ name: category })
//         if (existsCategory) {
//             query = query.where("category").equals(existsCategory._id);
//         } else {
//             return { content: [], currentPage: 1, totalPage: 0 }
//         }
//     }

//     if (color) {
//         const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
//         const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

//         query = query.where("color").regex(colorRegex);
//     }

//     if (sizes) {
//         const sizesSet = new Set(sizes);
//         query = query.where("sizes.name").in([...sizesSet]);
//     }

//     if (miniPrice || maxPrice) { // if any error come here then make the condition (miniPrice && maxPrice)
//         query = query.where("price").gte(miniPrice).lte(maxPrice);
//     }

//     if (stock) {
//         if (stock == "in_stock")
//             query = query.where("quantity").gt(0);

//         if (stock == "out_of_stock")
//             query = query.where("quantity").gt(1);

//     }

//     if (sort) {
//         const sortDirection = sort === "price_high" ? -1 : 1;
//     }

//     const totalProducts = await Product.countDocuments(query);

//     const skip = (pageNumber - 1) * pageSize;

//     query = query.skip(skip).limit(pageSize);

//     const products = await query.exec();

//     const totalPages = Math.ceil(totalProducts / pageSize);

//     return { content: products, currentPage: pageNumber, totalPages: totalPages }
// }

//for admin

async function getAllProducts(reqQuery) {
    let { category, color, sizes, miniPrice, maxPrice, sort, stock, pageNumber, pageSize } = reqQuery;

    pageNumber = pageNumber || 1;
    pageSize = pageSize || 10;

    let query = Product.find().populate("category"); // Initial query

    // Filtering by category
    if (category) {
        const existsCategory = await Category.findOne({ name: category });
        if (existsCategory) {
            query = query.where("category").equals(existsCategory._id);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    // Filtering by color
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

        if (colorRegex) {
            query = query.where("color").regex(colorRegex);
        }
    }

    // Filtering by sizes
    if (sizes) {
        const sizesSet = new Set(sizes.split(",").map(size => size.trim()));
        query = query.where("sizes.name").in([...sizesSet]);
    }

    // Filtering by price range
    if (miniPrice || maxPrice) {
        query = query.where("price").gte(miniPrice || 0).lte(maxPrice || Infinity);
    }

    // Filtering by stock availability
    if (stock) {
        if (stock === "in_stock") {
            query = query.where("quantity").gt(0);
        } else if (stock === "out_of_stock") {
            query = query.where("quantity").eq(0);
        }
    }

    // Sorting
    if (sort) {
        const sortDirection = sort === "price_high" ? -1 : 1;
        query = query.sort({ price: sortDirection });
    }

    // Get the total number of products after filtering
    const totalProducts = await Product.countDocuments(query);

    // Pagination
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    // Execute the query to get the products
    const products = await query.exec();

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages: totalPages };
}


async function addMultipleProduct(products) {
    for (let product of products) {
        await createProduct(product);
    }
}

export default { createProduct, deleteProduct, updateProduct, findProductById, getAllProducts, addMultipleProduct };