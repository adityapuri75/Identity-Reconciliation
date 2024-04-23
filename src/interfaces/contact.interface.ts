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

interface CreateContactDto extends Omit<Contact, 'id' | 'updatedAt' | 'deletedAt'> {}

interface UpdateContactDto extends Partial<Omit<Contact, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>> {}

export { LinkPrecedence, Contact, CreateContactDto, UpdateContactDto };
