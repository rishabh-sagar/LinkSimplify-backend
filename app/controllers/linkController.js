// linkController.js
const Link = require('../models/Link');
const generateShortLink = require('../utils/generateShortLink');

exports.createLink = async (req, res) => {
  try {
    const { userId } = req;
    const { originalUrl, customLink, customORrandom } = req.body;
    console.log("hi")
    // Check if the user wants a custom link
    if (customORrandom === 'custom') {
      // Check if the custom link already exists
      const existingCustomLink = await Link.findOne({ shortUrl: customLink });
      if (existingCustomLink) {
        return res.status(409).json({ error: 'Custom link already exists' });
      }

      const link = new Link({ originalUrl, shortUrl: customLink, userId });
      await link.save();
      return res.status(201).json({ shortUrl: customLink });
    } else if (customORrandom === 'random') {
      // Generate a random short link
      const shortUrl = generateShortLink();

      // Check if the random link already exists
      const existingLink = await Link.findOne({ shortUrl });
      if (existingLink) {
        return res.status(409).json({ error: 'Random link already exists' });
      }

      const link = new Link({ originalUrl, shortUrl, userId });
      await link.save();
      return res.status(201).json({ shortUrl });
    } else {
      return res.status(400).json({ error: 'Invalid customORrandom value' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Link creation failed' });
  }
};


exports.getActualLink = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const link = await Link.findOne({ shortUrl });
    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }
    link.hits++;
    await link.save();
    res.json({ originalUrl: link.originalUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching link' });
  }
};

// linkController.js (continued)
exports.getUserLinks = async (req, res) => {
    try {
      const { userId } = req;
      const links = await Link.find({ userId });
      res.json(links);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user links' });
    }
  };
  
  exports.updateLink = async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const { originalUrl } = req.body;
      const link = await Link.findOneAndUpdate({ shortUrl }, { originalUrl }, { new: true });
      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }
      res.json({ message: 'Link updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating link' });
    }
  };
  
  exports.deleteLink = async (req, res) => {
    try {
      const { shortUrl } = req.params;
      const link = await Link.findOneAndDelete({ shortUrl });
      if (!link) {
        return res.status(404).json({ error: 'Link not found' });
      }
      res.json({ message: 'Link deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting link' });
    }
  };
  