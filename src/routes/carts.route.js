import { Router } from "express";
import CartsDAO from "../dao/carts.dao.js";

const router = Router();
export default router;

// Get all carts
router.get("/", async (req, res) => {

    let carts;

    carts = await CartsDAO.getAll();

    res.render("carts", { carts });

});

// /carts/new
router.get("/new", (req, res) => {
    res.render("new-cart");
})

router.get("/:id", async (req, res) => {

    let id = req.params.id;

    if (!id) {
        res.redirect("/carts/");
    }

    let cart = await CartsDAO.getById(id);

    if (!cart) {
        res.render("404");
    }

    res.render("cart", {
        id: cart.id,
        products: cart.products
    });

});

// PUT : Modifica el carrito con el ID especificado
router.put('/:id', async (req, res) => {

    const cartID = parseInt(req.params.id);
    try {
        const updatedCart = await CartsDAO.update(cartID, req.body);
        res.json(updatedCart);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
});

// DELETE : Borra el carrito con el ID especificado
router.delete('/:id', async (req, res) => {
    const cartID = parseInt(req.params.id);
    try {
        const deletedCart = await CartsDAO.remove(cartID);
        res.json(deletedCart);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
});