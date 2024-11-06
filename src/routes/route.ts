import { Router } from 'express';
import { getAllNews, postNews, editNews, searchNews, getNewsDetail } from '../controllers/news';
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

router.route('/news/:id')
    .get(getNewsDetail);

router.route('/categories')
    .get(getAllCategories)
    .post(requireRole(['ADMIN']), postCategory)
    .patch(requireRole(['ADMIN']), editCategory);

router.route('/admin').get(requireRole(['ADMIN']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

export default router
