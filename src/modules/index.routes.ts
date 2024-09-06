import { Router } from 'express';
// eslint-disable-next-line linebreak-style

import AdminPermissionRoutes from './admin-permission/admin-permission.routes';
import AdminRoutes from './admin/admin.routes';
import AuthRoutes from './auth/auth.routes';
import ContactRoutes from './contact/contact.routes';
import ServicosRoutes from './servicos/service.routes';
import ChaveiroRoutes from './chaveiro/chaveiro.routes';
import RegisterRoutes from './register/register.routes';
import UploadFileRoutes from './upload-file/upload-file.routes';
import ClienteRoutes from './client/cliente.routes';


const router = Router();

router.use('/admins/permissions', AdminPermissionRoutes);
router.use('/admins', AdminRoutes);
router.use('/auth', AuthRoutes);
router.use('/contact', ContactRoutes);
router.use('/servico', ServicosRoutes);
router.use('/chaveiro', ChaveiroRoutes);
router.use('/clientes', ClienteRoutes);
router.use('/registers', RegisterRoutes);
router.use('/upload-file', UploadFileRoutes);

export default router;
