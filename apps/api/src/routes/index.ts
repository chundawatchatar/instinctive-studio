import { Router } from 'express';
import  categoryRoutes from './categories.routes';
import  searchRoutes from './search.routes';

const router: Router = Router();

router.use('/categories', categoryRoutes);
router.use('/search', searchRoutes);

router.get('/ping', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export const routes = router;
