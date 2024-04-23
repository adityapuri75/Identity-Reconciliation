import { hash } from 'bcrypt';
import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Contact } from '@interfaces/contact.interface';

@Service()
export class IdentifyService {
  public async identifyContact(userData: Contact) {
    // const { email, password } = userData;
    // const { rows } = await pg.query(
    //   `
    // SELECT EXISTS(
    //   SELECT
    //     "email"
    //   FROM
    //     users
    //   WHERE
    //     "email" = $1
    // )`,
    //   [email],
    // );
    // if (rows[0].exists) throw new HttpException(409, `This email ${email} already exists`);
    // const hashedPassword = await hash(password, 10);
    // const { rows: createUserData } = await pg.query(
    //   `
    //   INSERT INTO
    //     users(
    //       "email",
    //       "password"
    //     )
    //   VALUES ($1, $2)
    //   RETURNING "email", "password"
    //   `,
    //   [email, hashedPassword],
    // );
    // return createUserData[0];
  }
}
