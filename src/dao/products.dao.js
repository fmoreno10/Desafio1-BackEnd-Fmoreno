import Products from "./models/products.schema.js";

class ProductsDAO {

    static async getAll() {
        try {
            return Products.find().lean();
        } catch (error) {
            throw error;
        }
    }

    static async getAllWithStock() {        
        try {
            return Products.find({ stock: { $gt: 0 } }).lean();
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {        
        try {
            return Products.findOne({ _id: id }).lean();
        } catch (error) {
            throw error;
        }
    }

    static async add(title, description, photo, price, stock) {        
        try {
            return new Products({ title, description, photo, price, stock }).save();
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {   
        
        try {
            return Products.findOneAndUpdate({ _id: id }, data);
        } catch (error) {
            throw error;
        }
    }

    static async remove(id) {        
        try {
            return Products.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

export default ProductsDAO;
