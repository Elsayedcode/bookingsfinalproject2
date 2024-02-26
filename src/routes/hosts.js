import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import auth from "../middleware/auth.js";

const router = Router();

// GET /hosts?name=someName
router.get('/', async (req, res) => {
    try {
      console.log("test hosts")
      const { name } = req.query;        
        
        // Get the 'name' query parameter
        const hosts = await getHosts(name); // Call the getHosts function with the name
        res.json(hosts); // Send the retrieved hosts as a JSON response
    } catch (error) {
        // Error handling: send a 500 internal server error response
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
});

// POST /bookings - Create a new booking
router.post('/',  async (req, res) => {
    try {
        const hostData = req.body;
        const newHost = await createHost(hostData);
        res.status(201).json(newHost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single review by ID
router.get('/:id', async (req, res) => {
    try {
      const host = await getHostById(req.params.id);
      if (host) {
        res.json(host);
      } else {
        res.status(404).json({ error: 'Host not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a review by ID
  router.put('/:id',  async (req, res) => {
    try {
      const updatedHost = await updateHostById(req.params.id, req.body);
      res.json(updatedHost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a host by ID
  router.delete('/:id', auth, async (req, res) => {
    try {
      await deleteHostById(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

export default router;