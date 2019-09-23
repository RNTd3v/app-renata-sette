import { ContactModel } from '../db/schemas/Contact'
import ReplaceSpecialChars from '../utils/replaceSpecialChars'

export default {
  Query: {
    contacts: (_, args, { models }): Promise<ContactModel[]> => models.Contact.find(),
    contact: (_, { id }, { models }): Promise<ContactModel> => models.Contact.findById(id)
  },
  Mutation: {
    createContact: async (_, {
      phone,
      cellPhone,
      email,
      email2,
      street,
      number,
      district,
      city,
      state,
      cep }, { models }) : Promise<ContactModel> => {
      // create a new category
      const newContact = new models.Contact({
        phone,
        cellPhone,
        email,
        email2,
        street,
        number,
        district,
        city,
        state,
        cep
      })

      let contactRegistered

      // save the category
      try {
        contactRegistered = await newContact.save()
      } catch (e) {
        throw new Error('Cannot Save Contact!')
      }

      return contactRegistered
    },
    updateContact: async (_, { id, phone,
      cellPhone,
      email,
      email2,
      street,
      number,
      district,
      city,
      state,
      cep }, { models }): Promise<ContactModel> => {
      const contact = await models.Contact.findById(id)

      if (!contact) {
        throw new Error('Contato não encontrado!')
      }

      const newContact: ContactModel = {
        phone,
      cellPhone,
      email,
      email2,
      street,
      number,
      district,
      city,
      state,
      cep
      }

      await models.Contact.updateOne({ _id: id }, newContact)

      newContact.id = id

      return newContact
    },
    deleteContact: async (_, { id }, { models }) : Promise<ContactModel> => {
      const contact = await models.Contact.findById(id)

      if (!contact) {
        throw new Error('Contato não encontrado!')
      }

      const deleteContact = await models.Contact.deleteOne({ _id: id })

      console.log(deleteContact)

      return contact
    }
  }
}
