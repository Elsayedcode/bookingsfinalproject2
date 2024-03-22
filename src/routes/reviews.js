import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import login from "../services/auth/login.js";
import auth from "../middleware/auth.js";

const router = Router();

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    const review = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// DELETE /reviews/:id - Delete a review by ID
router.delete('/:id', async (req, res) => {
  try {
      const result = await deleteReviewById(req.params.id);
      if (!result) {
          return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json({ message: 'Review successfully deleted' });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});


// Get a single review by ID
router.get('/:id', async (req, res) => {
  try {
    const review = await getReviewById(req.params.id);
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Update a review by ID
router.put('/:id',  async (req, res) => {
  try {
    const updatedReview = await updateReviewById(req.params.id, req.body);
    res.json(updatedReview);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});



export default router;
