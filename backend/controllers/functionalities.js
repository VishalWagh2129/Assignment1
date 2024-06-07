const db = require('../models');
const Brand = db.Brand;
const Influencer = db.Influencer;

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