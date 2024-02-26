import { Router } from "express";
import getAmenities  from "../services/amenities/getAmenities.js";
import getAmenityById  from "../services/amenities/getAmenityById.js";
import deleteAmenityById  from "../services/amenities/deleteAmenityById.js";
import updateAmenityById  from "../services/amenities/updateAmenityById.js";
import createAmenity  from "../services/amenities/createAmenity.js";
import auth from "../middleware/auth.js";


const router = Router();

// POST /amenities - Create a new amenity
router.post('/', auth, async (req, res) => {
    try {
        const amenityData = req.body;
        const newAmenity = await createAmenity(amenityData);
        res.status(201).json(newAmenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /amenities - Get all amenities
router.get('/', async (req, res) => {
    try {
        console.log("check the code")
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /amenities/:id - Get an amenity by ID
router.get('/:id', async (req, res) => {
    try {
        const amenity = await getAmenityById(req.params.id);
        if (!amenity) {
            return res.status(404).json({ message: 'Amenity not found' });
        }
        res.json(amenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /amenities/:id - Update an amenity by ID
router.put('/:id', auth, async (req, res) => {
    try {
        const updatedAmenity = await updateAmenityById(req.params.id, req.body);
        if (!updatedAmenity) {
            return res.status(404).json({ message: 'Amenity not found' });
        }
        res.json(updatedAmenity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /amenities/:id - Delete an amenity by ID
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await deleteAmenityById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Amenity not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
