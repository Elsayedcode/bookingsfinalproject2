import { Router } from "express";
import getAmenities  from "../services/amenities/getAmenities.js";
import getAmenityById  from "../services/amenities/getAmenityById.js";
import deleteAmenityById  from "../services/amenities/deleteAmenityById.js";
import updateAmenityById  from "../services/amenities/updateAmenityById.js";
import createAmenity  from "../services/amenities/createAmenity.js";
import login from "../services/auth/login.js";
import auth from "../middleware/auth.js";


const router = Router();

// GET /amenities - Get all amenities
router.get('/', async (req, res,next) => {
    try {
        
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        next(error);
    }
});
// POST /amenities - Create a new amenity
router.post('/', auth, async (req, res) => {
    try {
        const {name} = req.body;
        const newAmenity = await createAmenity(name);
        res.status(201).json(newAmenity);
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
});

// GET /amenities/:id - Get an amenity by ID
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const amenity = await getAmenityById(id);
        if (!amenity) {
         res.status(404).json({ message: `amenity with id ${id} not found` });
        } else{
            res.status(200).json(amenity);
        }
    } catch (error) {
        next(error);
    } 
});

// DELETE /amenities/:id - Delete an amenity by ID
router.delete('/:id', auth,async (req, res,next) => {
    try {
        const { id } = req.params;
        const amenity = await deleteAmenityById(id);
        if (amenity) {
            res.status(200).send({ message: `Amenity with id ${id} successfully deleted`, amenity });
        } else {
            res.status(404).json({ message: `Amenity with id ${id} not found` });
        }
        
    } catch (error) {
        next(error);
    }
});


// PUT /amenities/:id - Update an amenity by ID
router.put('/:id', auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const Amenity = await updateAmenityById(id, { name });
        if (Amenity) {
            res.status(200).send({ message: `Amenity with id ${id} successfully updated` });
        } else {
            res.status(404).json({
              message: `Amenity with id ${id} not found`,
            });
        }
    } catch (error) {
        next(error);
    }
});



export default router;
