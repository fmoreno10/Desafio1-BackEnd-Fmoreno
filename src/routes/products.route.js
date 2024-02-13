import { Router} from "express";
import upload from "../utils/upload.middleware.js";

import ProductsDAO from "../dao/products.dao.js";

const router = Router();
export default router;

// /products -> Muestro todos los productos
// /products?stock -> Muestre todos los productos con stock
router.get("/", async (req, res) => {

    let withStock = req.query.stock;

    let products;
    if(withStock === undefined){

        try {
            products = await ProductsDAO.getAll();
        } catch (error) {
            console.log(error);
            res.status(500).render("500",{error: error});
        }

    } else {
        
        try {
            products = await ProductsDAO.getAllWithStock();
        } catch (error) {
            console.log(error);
            res.status(501).render("500",{error: error});
        }
    }

    res.render("products",{products});

});

// /products/new
router.get("/new", (req, res) => {
    res.render("new-product");
})

// /product/update
router.get("/update/:id", async (req, res) => {

    let id = req.params.id;

    if(!id){
        res.redirect("/products/");
    }

    let product = await ProductsDAO.getById(id);

    res.render("update-product",{
        id: id,
        title:product.title,
        description: product.description,
        stock: product.stock,
        price: product.price     
    });
})

router.get("/:id", async (req, res) => {

    let id = req.params.id;

    if(!id){
        res.redirect("/products/");
    }

    let product = await ProductsDAO.getById(id);

    if(!product){
        res.render("404");
    }

    res.render("product",{
        id: id,
        title:product.title,
        description: product.description,
        photo: product.photo,
        price: product.price,
        isStock: product.stock > 0
    });

});


router.post("/", upload.single('image'), async (req, res) => {

    let filename = req.file.filename; // 17071
    let product = req.body;
    
    try {
        await ProductsDAO.add(product.title, product.description, filename, product.price, product.stock);
    } catch (error) {
        console.log(error);
        res.status(502).render("500",{error: error});
    }

    res.redirect("/products");

})

// POST : Modifica el producto con el ID especificado
router.post('/update', upload.single('image'), async (req, res) => {
        
    let filename = req.file.filename;
    let updatedProductBody = req.body;
    const productID = updatedProductBody.id;
    
    try {
        const updatedProduct = await ProductsDAO.update(productID, {photo: filename, ...updatedProductBody});        
        res.render("product",updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(503).render("500",{error: error});
    }

});

// DELETE : Borra el producto con el ID especificado
router.delete('/:id', async (req, res) => {
    const productID = req.params.id;

    try {
        const deletedProduct = await ProductsDAO.remove(productID);        
        res.render("home");
    } catch (error) {
        console.log(error);
        res.status(504).render("500",{error: error});
    }

});