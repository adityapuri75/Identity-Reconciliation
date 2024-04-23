import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IdentifyContactDto, ContactResponseData} from '@interfaces/contact.interface';
import { IdentifyService } from '@services/identify.service';

export class IdentifyController {
  public user = Container.get(IdentifyService);

  public identifyContact = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const contactData: IdentifyContactDto = req.body;
      const identifyContactData: ContactResponseData = await this.user.identifyContact(contactData);

      res.status(201).json({ data: identifyContactData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

}
