import {Router} from 'express';
import {createItem,searchItems,resolveItem,contactPublisher} from '../controllers/itemsController.js';

const r=Router();
r.post('/',createItem);
r.get('/',searchItems);
r.patch('/:id/resolve',resolveItem);
r.post('/:id/contact',contactPublisher);
export default r;
