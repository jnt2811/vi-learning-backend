const router = require("express").Router();

const databaseResource = require('../controllers/resources/databaseResource')
const userResource = require('../controllers/resources/userResource')

router.post('/api/resources/database/initDatabase', databaseResource.initDatabase)


router.post('/api/public/users/login', userResource.login)
//User
router.get('/api/resources/users/getAllUser', userResource.getAllUser)
router.get('/api/resources/users/getUserInformation', userResource.getUserInformation)
router.post('/api/resources/users/addNewUser', userResource.addNewUser)
router.post('/api/resources/users/updateUser', userResource.updateUser)
router.delete('/api/resources/users/deleteUser', userResource.deleteUser)
module.exports = router;
