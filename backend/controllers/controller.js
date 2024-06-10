const db = require('../models');
const User = db.User;
const Brand = db.Brand;
const Influencer = db.Influencer;
const Campaign = db.Campaign;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ success: false, data: null, message: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(200).json({ success: false, data: null, message: 'Invalid email or password' });
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, data: { token }, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, data: null, message: 'Internal server error' });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, mobile, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      UserName: username,
      Mobile: mobile,
      Email: email,
      Password: hashedPassword
    });
    res.status(200).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Signup failed', error: error.message });
  }
};

exports.SaveBrand = async (req, res) => {
  try {
    const { name, status, description } = req.body;
    const newBrand = new Brand({ Name: name, Status: status, Description: description });
    const savedBrand = await newBrand.save();
    res.status(200).json({ success: true, message: 'Brand created successfully', data: savedBrand });
  } catch (error) {
    res.status(500).json({
      success: false, message: 'Unsuccesful saving Brand', error: error.message
    });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll();
    res.status(200).json({ success: true, message: 'All Brands Fetched', data: brands });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Brands' });
  }
};

exports.getBrandByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Brand' });
  }
};

exports.updateBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, description } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    brand.Name = name || brand.Name;
    brand.Status = status || brand.Status;
    brand.Description = description || brand.Description;
    await brand.save();
    res.status(200).json({ success: true, data: brand });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update Brand' });
  }
};

// deleteBrand API using Sequelize
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Brand ID is required' });
    }
    const result = await Brand.destroy({ where: { id: id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Brand' });
  }
};


exports.SaveInfluencer = async (req, res) => {
  try {
    const { name, status, description,email,gender,location } = req.body;
    const newInfluencer = new Influencer({ Name: name, Status: status, Description: description,Email:email,Gender:gender,Location:location });
    const savedInfluencer = await newInfluencer.save();
    res.status(200).json({ success: true, message: 'Influencer created successfully', data: savedInfluencer });
  } catch (error) {
    res.status(500).json({
      success: false, message: 'Error saving Influencer', error: error.message
    });
  }
};

exports.getAllInfluencers= async (req, res) => {
  try {
    const Influencers = await Influencer.findAll();
    res.status(200).json({ success: true, message: 'All Influencers Fetched', data: Influencers });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Influencers' });
  }
};

exports.getInfluencerByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Influencer ID is required' });
    }
    const influencer = await Influencer.findByPk(id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    res.status(200).json({ success: true, data: influencer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Influencer' });
  }
};

exports.updateInfluencerById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status, description, location, email, gender } = req.body;
    if (!id) {
      return res.status(400).json({ error: 'Influencer ID is required' });
    }
    const influencer = await Influencer.findByPk(id);
    if (!influencer) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    influencer.Name = name || influencer.Name;
    influencer.Status = status || influencer.Status;
    influencer.Description = description || influencer.Description;
    influencer.Location = location || influencer.Location;
    influencer.Email = email || influencer.Email;
    influencer.Gender = gender || influencer.Gender;
    await influencer.save();
    res.status(200).json({ success: true, data: influencer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update Influencer' });
  }
};


// deleteBrand API using Sequelize
exports.deleteInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Influencer ID is required' });
    }
    const result = await Influencer.destroy({ where: { id: id } });
    if (result === 0) {
      return res.status(404).json({ error: 'Influencer not found' });
    }
    res.status(200).json({ success: true, message: 'Influencer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete Influencer' });
  }
};

exports.SaveCampaign = async (req, res) => {
  try {
    const {  name,status, description,brand,influencer } = req.body;
    const newCampaign = new Campaign({ Campign_Name:name,Status: status, Description: description,Brand:brand,Influencers:influencer });
    const savedCampaign = await newCampaign.save();
    res.status(200).json({ success: true, message: 'Campaign created successfully', data: savedCampaign });
  } catch (error) {
    res.status(500).json({success: false, message: 'Error saving Campaign', error: error.message});
  }
};

exports.getAllCampaigns= async (req, res) => {
  try {
    const campaign = await Campaign.findAll();
    res.status(200).json({ success: true, message: 'All Campaign Fetched', data: campaign });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaign' });
  }
};

exports.getCampaignByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Campaign ID is required' });
    }
    const influencer = await Campaign.findByPk(id);
    if (!influencer) {
      return res.status(404).json({ error: 'Campaign not found' });
    }
    res.status(200).json({ success: true, data: influencer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Campaign' });
  }
};

exports.updateCampaignById = async (req, res) => {
  try {
    console.log(req.body);
    const { id } = req.params;
    const { name, status, description, brand,influencer } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'campaign ID is required' });
    }
    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({ error: 'campaign not found' });
    }
    campaign.Campign_Name = name || campaign.Campign_Name;
    campaign.Status = status || campaign.Status;
    campaign.Description = description || campaign.Description;
    campaign.Brand = brand || campaign.Brand;
    campaign.Influencers = influencer || campaign.Influencers;
    await campaign.save();
    res.status(200).json({ success: true, data: campaign });
  } catch (error) {
    res.status(500).json({ error: 'Failed to Update Campaign' });
  }
};


// deleteBrand API using Sequelize
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'campaign ID is required' });
    }
    const result = await Campaign.destroy({ where: { id: id } });
    if (result === 0) {
      return res.status(404).json({ error: 'campaign not found' });
    }
    res.status(200).json({ success: true, message: 'campaign deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete campaign' });
  }
};
