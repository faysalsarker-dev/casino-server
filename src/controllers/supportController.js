const Support = require('../models/Support');

// Create a new support link
exports.createSupport = async (req, res) => {
  try {
    const { icon, link, name } = req.body;

    if (!icon || !link) {
      return res.status(400).json({ message: 'Icon and link are required' });
    }

    const savedSupport = await Support.create({ icon, link, name });

    res.status(201).json(savedSupport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create support link', error: error.message });
  }
};

// Get all support links
exports.getSupports = async (req, res) => {
  try {
    const supports = await Support.find();
    res.status(200).json(supports);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch support links', error: error.message });
  }
};

// Get a single support link by ID
exports.getSupportById = async (req, res) => {
  try {
    const { id } = req.params;
    const support = await Support.findById(id);

    if (!support) {
      return res.status(404).json({ message: 'Support link not found' });
    }

    res.status(200).json(support);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch support link', error: error.message });
  }
};

// Update a support link by ID
exports.updateSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const { icon, link, name } = req.body;

    const updatedSupport = await Support.findByIdAndUpdate(
      id,
      { icon, link, name },
      { new: true, runValidators: true }
    );

    if (!updatedSupport) {
      return res.status(404).json({ message: 'Support link not found' });
    }

    res.status(200).json(updatedSupport);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update support link', error: error.message });
  }
};

// Delete a support link by ID
exports.deleteSupport = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSupport = await Support.findByIdAndDelete(id);

    if (!deletedSupport) {
      return res.status(404).json({ message: 'Support link not found' });
    }

    res.status(200).json({ message: 'Support link deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete support link', error: error.message });
  }
};
