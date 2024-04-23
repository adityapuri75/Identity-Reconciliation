import { hash } from 'bcrypt';
import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { IdentifyContactDto } from '@interfaces/contact.interface';

@Service()
export class IdentifyService {
  public async identifyContact(userData: IdentifyContactDto) {
    const { email, phoneNumber } = userData;
    
  }
}
