const Tenent = require('../models/Tenent');



// Get all employees
const getAll = async (req, res) => {

  try {

    const tenent = await Tenent.find().sort({ createdAt: -1 });
    res.status(200).json({ tenent });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get an employee by ID
const getById = async (req, res) => {
  try {
    const tenent = await Tenent.findById(req.params.id);
    if (!tenent) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ tenent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// Create a new employee
const create = async (req, res) => {
  try {
    const { name, phno, roomno, rent, deposit, due } = req.body;


    const tenent = new Tenent({ name, phno, roomno, rent, deposit, due });
    await tenent.save();
    res.status(201).json({ message: 'Customer created successfully', tenent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update an employee by ID
const updateById = async (req, res) => {
  try {

    const { name, phno, roomno, rent, deposit, due } = req.body;

    const customerupdate = {
      name, phno, roomno, rent, deposit, due
    };

    const tenent = await Tenent.findByIdAndUpdate(req.params.id, customerupdate, { new: true });
    if (!tenent) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer updated successfully', tenent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Delete an employee by ID
const deleteById = async (req, res) => {
  try {
    const tenent = await Tenent.findByIdAndDelete(req.params.id);
    if (!tenent) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getAll, getById, create, updateById, deleteById }

