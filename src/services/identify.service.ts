import { Service } from 'typedi';
import pg from '@database';
import { IdentifyContactDto } from '@interfaces/contact.interface';

@Service()
export class IdentifyService {
  public async identifyContact(userData: IdentifyContactDto) {
    const { email, phoneNumber } = userData;

    // Query the database for matching contacts
    const queryText = `
    WITH AllContacts AS (
        SELECT DISTINCT *
        FROM contacts
        WHERE email = $1 OR phoneNumber = $2
      ),
      PrimaryContacts AS (
        SELECT DISTINCT *
        FROM contacts
        WHERE id IN (SELECT linkedId FROM AllContacts)
      ),
      SecondaryContacts AS (
        SELECT DISTINCT *
        FROM contacts
        WHERE linkedId IN (SELECT id FROM AllContacts)
      )
      SELECT DISTINCT *
      FROM (
        SELECT *
        FROM AllContacts
        UNION ALL
        SELECT *
        FROM PrimaryContacts
        UNION ALL
        SELECT *
        FROM SecondaryContacts
      ) AS combined_contacts;
    `;
    const { rows: matchingContacts } = await pg.query(queryText, [email, phoneNumber]);

    // Check if there are any matching contacts
    if (matchingContacts.length === 0) {
      // Create a new primary contact
      const newPrimaryContactQuery = `
        INSERT INTO contacts (phoneNumber, email, linkPrecedence)
        VALUES ($1, $2, 'primary')
        RETURNING id;
      `;
      const { rows: newPrimaryContact } = await pg.query(newPrimaryContactQuery, [phoneNumber, email]);

      // Return the new primary contact with an empty secondaryContactIds array
      return {
        contact: {
          primaryContatctId: newPrimaryContact[0].id,
          emails: [email],
          phoneNumbers: [phoneNumber],
          secondaryContactIds: [],
        },
      };
    } else {
      // Separate primary and secondary contacts
      const primaryContacts = matchingContacts.filter(contact => contact.linkprecedence === 'primary');
      const secondaryContacts = matchingContacts.filter(contact => contact.linkprecedence === 'secondary');

      // Sort primary contacts by createdAt timestamp to pick the oldest one as primary
      primaryContacts.sort((firstContact, secondContact) => new Date(firstContact.createdAt).getTime() - new Date(secondContact.createdAt).getTime());
      const primaryContact = primaryContacts[0]; // Pick the oldest primary

      const queryText1 = `
      SELECT *
      FROM contacts
      WHERE email = $1;
      `;

      const queryText2 = `
      SELECT *
      FROM contacts
      WHERE phoneNumber = $1;
      `;

      const { rows: checkEmail } = await pg.query(queryText1, [email]);

      const { rows: checkNumber } = await pg.query(queryText2, [phoneNumber]);

      // if there are multiple primaryContacts then will update the ramaning as scandory
      const secondaryContactIds = [];
      if (primaryContacts.length > 1) {
        // Update remaining primary contacts to secondary
        for (let i = 1; i < primaryContacts.length; i++) {
          const updatePrimaryContactQuery = `
            UPDATE contacts SET linkPrecedence = 'secondary', linkedId = $1 WHERE id = $2;
          `;
          secondaryContactIds.push(primaryContacts[i].id);
          await pg.query(updatePrimaryContactQuery, [primaryContact.id, primaryContacts[i].id]);
        }

        // Filtring phone numbers

        const secondaryPhoneNumbers = secondaryContacts.map(contact => contact?.phonenumber);
        const primaryPhoneNumbers = primaryContacts.map(contact => contact?.phonenumber);

        const allPhoneNumbers = [...primaryPhoneNumbers, ...secondaryPhoneNumbers];

        const uniquePhoneNumbers = [...new Set(allPhoneNumbers)];

        // Filter out duplicates emails

        const secondaryEmails = secondaryContacts.map(contact => contact?.email);

        const primaryEmails = primaryContacts.map(contact => contact?.email);

        const allEmails = [...primaryEmails, ...secondaryEmails];

        const uniqueEmails = [...new Set(allEmails)];

        // Return the primary contact and all secondary contacts in the response
        return {
          contact: {
            primaryContatctId: primaryContact.id,
            emails: uniqueEmails,
            phoneNumbers: uniquePhoneNumbers,
            secondaryContactIds: secondaryContactIds.concat(secondaryContacts.map(contact => contact.id)),
          },
        };
      }

      // if there is no contact related to the user input then will create the scandory
      if ((checkEmail.length === 0 || checkNumber.length === 0) && email != null && phoneNumber != null) {
        // Create a new secondary contact
        const newSecondaryContactQuery = `
        INSERT INTO contacts (phoneNumber, email, linkedId, linkPrecedence)
        VALUES ($1, $2, $3, 'secondary')
        RETURNING id, email, phoneNumber;
      `;
        const { rows: newSecondaryContact } = await pg.query(newSecondaryContactQuery, [phoneNumber, email, primaryContact.id]);

        // Filtring phone numbers

        const secondaryPhoneNumbers = secondaryContacts.map(contact => contact.phonenumber);

        const allPhoneNumbers = [primaryContact.phonenumber, newSecondaryContact[0].phonenumber, ...secondaryPhoneNumbers];

        const uniquePhoneNumbers = [...new Set(allPhoneNumbers)];

        // Filter out duplicates emailss

        const secondaryEmails = secondaryContacts.map(contact => contact.email);

        const allEmails = [primaryContact.email, newSecondaryContact[0].email, ...secondaryEmails];

        const uniqueEmails = [...new Set(allEmails)];

        return {
          contact: {
            primaryContatctId: primaryContact.id,
            emails: uniqueEmails,
            phoneNumbers: uniquePhoneNumbers,
            secondaryContactIds: secondaryContacts.map(contact => contact.id).concat(newSecondaryContact[0].id),
          },
        };
      }

      const secondaryPhoneNumbers = secondaryContacts.map(contact => contact?.phonenumber);

      const allPhoneNumbers = [primaryContact.phonenumber, ...secondaryPhoneNumbers];

      const uniquePhoneNumbers = [...new Set(allPhoneNumbers)];

      // Filter out duplicates emails

      const secondaryEmails = secondaryContacts.map(contact => contact?.email);

      const allEmails = [primaryContact.email, ...secondaryEmails];

      const uniqueEmails = [...new Set(allEmails)];

      // Return the primary contact and all secondary contacts in the response
      return {
        contact: {
          primaryContatctId: primaryContact.id,
          emails: uniqueEmails,
          phoneNumbers: uniquePhoneNumbers,
          secondaryContactIds: secondaryContacts.map(contact => contact.id),
        },
      };
    }
  }
}
