import express from 'express';
import { trackVisitor, getVisitors } from '../controllers/visitor.conntrollers.mjs';

const router = express.Router();

router.post("/visitor", trackVisitor);
router.get('/visitors', getVisitors);

export default router
