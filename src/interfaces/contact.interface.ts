enum LinkPrecedence {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface Contact {
  id: number;
  phoneNumber?: string;
  email?: string;
  linkedId?: number;
  linkPrecedence: LinkPrecedence;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface ContactResponseData {
  contact: {
    primaryContactId: number;
    emails: string[];
    phoneNumbers: string[];
    secondaryContactIds: number[];
  };
}

interface CreateContactDto extends Omit<Contact, 'id' | 'updatedAt' | 'deletedAt'> {}

interface UpdateContactDto extends Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> {}

interface IdentifyContactDto extends Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'linkedId' | 'linkPrecedence'>> {}

export { LinkPrecedence, Contact, CreateContactDto, UpdateContactDto, IdentifyContactDto, ContactResponseData };
