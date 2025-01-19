import { model, Schema } from 'mongoose';

import { contactTypeList } from '../../constants/contacts.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email : {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      default: 'personal',
      enum: contactTypeList,
      required: true,
    },
    photo: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false, timestamps: true,
  },
);

contactsSchema.post("save", (error, doc, next)=> {
error.status = 400;
next();
});

contactsSchema.pre("findOneAndUpdate", function(next) {
    this.options.new = true,
    this.options.runValidators = true,
next();
});

contactsSchema.post("findOneAndUpdate", (error, doc, next)=> {
  error.status = 400;
  next();
  });

  export const sortByList = ['name'];

export const ContactsCollection = model('contacts', contactsSchema);