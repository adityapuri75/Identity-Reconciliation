import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Contact } from '@interfaces/contact.interface';
import { IdentifyService } from '@services/identify.service';

export class IdentifyController {
  public user = Container.get(IdentifyService);

  public identifyContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: Contact = req.body;
    //   const createUserData: Contact = await this.user.identifyContact(userData);

    //   res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

}
