const db = require('../models');
const User = db.User;
const Brand = db.Brand;
const Influencer = db.Influencer;
const Campaign = db.Campaign;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getBrands = async (req, res) => {
    try {
        const brands = await Brand.findAll({
            where: { Status: 'ACTIVE' }
        });
        res.status(200).json({ success: true, data: brands });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brands' });
    }
};

exports.getInfluencers = async (req, res) => {
    try {
        const influencers = await Influencer.findAll({
            where: { Status: 'ACTIVE' }
        });
        res.status(200).json({ success: true, data: influencers });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brands' });
    }
};