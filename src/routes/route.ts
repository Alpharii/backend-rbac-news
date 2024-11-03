import { Router } from 'express';
import { getAllNews, postNews } from '../controllers/news';
import { getAllCategories, postCategory } from '../controllers/categories';
import { register, login, logout, getAllUsers } from '../controllers/auth';
import { requireRole } from '../middleware/requireRole';

const router = Router();

router.route('/user').get((getAllUsers))
router.route('/register').post((register))
router.route('/login').post((login))
router.route('/logout').delete((logout))

router.route('/news').get((getAllNews)).post((postNews))
router.route('/categories').get((getAllCategories)).post((postCategory))

// Endpoint yang memerlukan peran ADMIN
router.route('/admin').get(( requireRole(['ADMIN']), (req, res) => {
    res.json({ message: 'Welcome Admin' });
  }));


// router.route('/admin-only').get(authorizeRole('ADMIN') ,async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.send('hi admin')
// })

// router.route('/user-page').get(authorizeRole('USER'), async (req, res) => {
//     const user = req.user;
//     res.json(user);
//   });

export default router