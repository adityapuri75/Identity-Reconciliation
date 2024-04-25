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

      res.status(200).json( identifyContactData );
    } catch (error) {
      next(error);
    }
  };

}
