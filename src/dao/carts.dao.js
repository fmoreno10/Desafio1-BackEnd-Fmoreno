import Carts from "./models/carts.schema.js";

class CartsDAO {

    static async getAll() {        
        try {
            return Carts.find().lean();
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {        
        try {
            return Carts.findOne({ _id: id }).lean();
        } catch (error) {
            throw error;
        }
    }

    static async add(id, products) {        
        try {
            return new Carts({id, products}).save();
        } catch (error) {
            throw error;
        }
    }

    static async update(id, data) {        
        try {
            return Carts.findOneAndUpdate({ _id: id }, data);
        } catch (error) {
            throw error;
        }
    }

    static async remove(id) {        
        try {
            return Carts.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

}

export default CartsDAO;
