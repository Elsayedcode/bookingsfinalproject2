import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import login from "../services/auth/login.js";
import auth from "../middleware/auth.js";

const router = Router();


router.post('/', async (req, res) => {
  try {
      const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
      const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
      res.status(201).json(newHost);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

  
  // Delete a host by ID
  router.delete('/:id',  async (req, res) => {
    try {
      
      const { id } = req.params;
        const host = await deleteHostById(id);
      res.status(200).json({
        message: `host ${id} is verwijderd`
    })
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

// Update a review by ID
router.put('/:id',  async (req, res) => {
  try {
    const updatedHost = await updateHostById(req.params.id, req.body);
    res.json(updatedHost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  

export default router;