import { Router } from 'express';
import { getAllNews, postNews, editNews, searchNews } from '../controllers/news';
import { getAllCategories, postCategory, editCategory } from '../controllers/categories';
import { register, login, logout, getAllUsers } from '../controllers/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

router.route('/user').get((getAllUsers))
router.route('/register').post((register))
router.route('/login').post((login))
router.route('/logout').delete((logout))

router.route('/news')
    .get(getAllNews)
    .post(requireRole(['ADMIN']), postNews)
    .patch(requireRole(['ADMIN']), editNews);

    router.route('/news/search')
    .get(searchNews);

router.route('/categories')
    .get(getAllCategories)
    .post(requireRole(['ADMIN']), postCategory)
    .patch(requireRole(['ADMIN']), editCategory);

// router.route('/news/:id')
//     .get(getNewsDetail);



router.route('/admin').get(requireRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});



// router.route('/admin-only').get(authorizeRole('ADMIN') ,async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.send('hi admin')
// })

// router.route('/user-page').get(authorizeRole('USER'), async (req, res) => {
//     const user = req.user;
//     res.json(user);
//   });

export default router