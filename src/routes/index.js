const router = require("express").Router();

const databaseResource = require('../controllers/resources/databaseResource')
const userResource = require('../controllers/resources/userResource')
const courseResource = require('../controllers/resources/courseResource')
const lessonResource = require('../controllers/resources/lessonResource')

router.post('/api/public/database/initDatabase', databaseResource.initDatabase)

router.post('/api/public/users/login', userResource.login)
//User
router.post('/api/resources/users/getAllUser', userResource.getAllUser)
router.post('/api/resources/users/getUserInformation', userResource.getUserInformation)
router.post('/api/resources/users/addNewUser', userResource.addNewUser)
router.post('/api/resources/users/updateUser', userResource.updateUser)
router.post('/api/resources/users/deleteUser', userResource.deleteUser)

//Course
router.post('/api/resources/course/getAllCourse', courseResource.getAllCourse)
router.post('/api/resources/course/getCourse', courseResource.getCourse)
router.post('/api/resources/course/addNewCourse', courseResource.addNewCourse)
router.post('/api/resources/course/updateCourse', courseResource.updateCourse)

//Lesson
router.post('/api/resources/lesson/getLesson', lessonResource.getLesson)
router.post('/api/resources/lesson/addNewLesson', lessonResource.addNewLesson)
router.post('/api/resources/lesson/updateLesson', lessonResource.updateLesson)

router.post('/api/test/axiosGet', lessonResource.test)

module.exports = router;
