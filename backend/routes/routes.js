const express = require('express');
const router = express.Router();
const userController = require('../controllers/controller');
const functionalities = require('../controllers/functionalities');


router.post('/login', userController.login); 
router.post('/signup',userController.signup);

router.post('/saveBrand',userController.SaveBrand);
router.get('/getAllBrands',userController.getAllBrands);
router.get('/getBrandbyId/:id',userController.getBrandByID);
router.put('/updateBrand/:id',userController.updateBrandById);
router.delete('/deleteBrand/:id', userController.deleteBrand);

router.post('/saveInfluencer',userController.SaveInfluencer);
router.get('/getAllInfluencers',userController.getAllInfluencers);
router.get('/getInfluencerbyId/:id',userController.getInfluencerByID);
router.put('/updateInfluencer/:id',userController.updateInfluencerById);
router.delete('/deleteInfluencer/:id', userController.deleteInfluencer);

router.post('/saveCampaign',userController.SaveCampaign);
router.get('/getAllCampaigns',userController.getAllCampaigns);
router.get('/getCampaignbyId/:id',userController.getCampaignByID);
router.put('/updateCampaign/:id',userController.updateCampaignById);
router.delete('/deleteCampaign/:id', userController.deleteCampaign);

router.get('/getInfluencers',functionalities.getInfluencers);
router.get('/getBrands',functionalities.getBrands);

module.exports = router;
