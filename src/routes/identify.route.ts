import { Router } from 'express';
import { IdentifyController } from '@controllers/identify.controller';
import { IdentifyContactDto } from '@dtos/contact.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';

export class IdentifyRoute implements Routes {
  public path = '/identify';
  public router = Router();
  public contact = new IdentifyController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(IdentifyContactDto), this.contact.identifyContact);
  }
}
