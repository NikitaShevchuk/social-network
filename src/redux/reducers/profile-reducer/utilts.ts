import { Contacts, ContactsArray, SocialMediaName } from '../../../types/ProfileTypes';

export const mapToContactsArray = (contacts: Contacts): ContactsArray =>
    Object.keys(contacts).map((key) => [key as SocialMediaName, contacts[key as SocialMediaName]]);
