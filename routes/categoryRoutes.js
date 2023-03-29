const express = require('express')
const router = express.Router();
const multer = require('multer')
const categoryController = require('../controllers/categoriesController');
const { loginCheck, isAdmin } = require('../middleware/auth');


// Image Upload setting
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/uploads/categories");
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "_" + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage });



router.get('/all-category', categoryController.getAllCategories);
router.post('/add-category',
//  loginCheck,
//   isAdmin,
  // upload image
   categoryController.addCategory)

router.patch('/:id',
    // loginCheck,
    // isAdmin,
    categoryController.editCategory    
)

router.delete('/:id',
    // loginCheck,
    categoryController.deleteCategory
)

module.exports = router;