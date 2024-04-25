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

type CreateContactDto = Omit<Contact, 'id' | 'updatedAt' | 'deletedAt'>;

type UpdateContactDto = Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>>;

type IdentifyContactDto = Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'linkedId' | 'linkPrecedence'>>;

export { LinkPrecedence, Contact, CreateContactDto, UpdateContactDto, IdentifyContactDto, ContactResponseData };
