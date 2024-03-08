import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import createProperty from "../services/properties/createProperty.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import login from "../services/auth/login.js";
import auth from "../middleware/auth.js";

const router = Router();

router.post("/",  async (req, res, next) => {
  try {
    const { hostId, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, amenities } = req.body;
    
    // Construct a single object from the destructured properties
    const propertyData = {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
      amenities
    };

    const newProperty = await createProperty(propertyData);
    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id",  async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProperty = await deletePropertyById(id);

    if (deletedProperty) {
      res.status(200).send({
        message: `Property with id ${id} successfully deleted`,
        deletedProperty
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /properties?location=...&pricePerNight=...
router.get('/', async (req, res) => {
    try {
      console.log("test properties")
        const { location, pricePerNight, amenities} = req.query;
        const properties = await getProperties({ location, pricePerNight, amenities: [] });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


  

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);

    if (!property) {
      res.status(404).json({ message: `User with id ${id} not found` });
    } else {
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});



router.put("/:id",  async (req, res, next) => {
  try {
    const { id } = req.params;
    const { hostId, title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, rating, amenityIds } = req.body;
    const property = await updatePropertyById(id, { hostId, title, description, location, pricePerNight, bedroomCount, bathroomCount, maxGuestCount, rating, amenityIds});

    if (property) {
      res.status(200).send({
        message: `Property with id ${id} successfully updated`,
      });
    } else {
      res.status(404).json({
        message: `Property with id ${id} not found`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;