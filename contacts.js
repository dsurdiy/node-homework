const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contactId = String(id);
  const oneContact = contacts.find((item) => item.id === contactId);

  return oneContact || null;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const contactId = String(id);
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const [removedContact] = contacts.splice(contactIndex, 1);
  await updateContacts(contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
