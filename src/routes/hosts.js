import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import createHost from "../services/hosts/createHost.js";
import getHostById from "../services/hosts/getHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import login from "../services/auth/login.js";
import auth from "../middleware/auth.js";

const router = Router();


router.get('/', async (req, res) => {
  try {
    console.log("test hosts")
    const { name } = req.query;    
        
      
      // Get the 'name' query parameter
      const hosts = await getHosts(name); 
      res.status(200).json(hosts); 
  } catch (error) {
      console.error(error); 
      res.status(500).json( [error] );
  }
});


router.post('/', async (req, res) => {
  try {
      const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
      const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
      res.status(201).json(newHost);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

  
  // Delete a host by ID
  router.delete('/:id',  async (req, res) => {
    try {
      
      const  id  = req.params.id;
      console.log("req.params:",req.params)
      console.log("req.params.id:",req.params.id)
      console.log("id regel 46:",id)
      const host = await deleteHostById(id);
      console.log("host regel 48:", host)
      res.status(200).json({
        message: `host ${id} is verwijderd`
    })
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  // Get a single review by ID
router.get('/:id', async (req, res) => {
  try {
    const host = await getHostById(req.params.id);
    if (host) {
      res.status(200).json(host);
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
    res.status(200).json(updatedHost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});
  

export default router;