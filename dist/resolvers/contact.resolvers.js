"use strict";Object.defineProperty(exports, "__esModule", {value: true});

exports. default = {
  Query: {
    contacts: (_, args, { models }) => models.Contact.find(),
    contactsAuth: (_, args, { models }) => models.Contact.find(),
    contact: (_, { id }, { models }) => models.Contact.findById(id)
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
      cep
    }, { models }) => {
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
    updateContact: async (_, {
      id, phone,
      cellPhone,
      email,
      email2,
      street,
      number,
      district,
      city,
      state,
      cep
    }, { models }) => {
      const contact = await models.Contact.findById(id)

      if (!contact) {
        throw new Error('Contato não encontrado!')
      }

      const newContact = {
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
    deleteContact: async (_, { id }, { models }) => {
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
