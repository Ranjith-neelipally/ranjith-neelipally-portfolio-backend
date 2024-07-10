import e, { Router } from "express";
import { GetAdminDetails } from "../../controller/Admin";

const AdminRouter = Router()

AdminRouter.get("/", GetAdminDetails)

export default AdminRouter