import { Template } from 'meteor/templating';
import {Accounts} from 'meteor/accounts-base';
import './main.html';
import { Notes } from '../lib/collections.js';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Template.body .helpers({
  notes: [
    {text: "My Note 1"},
    {text: "My Note 2"},
    {text: "My Note 3"}
  
  
  ]
 /*
  notes(){
    return Notes.find({});
  }*/
});



Template.add.events({
  "submit .add-form": function(){
    event.preventDefault();

    const target = event.target;
    const text= target.text.value;


    Notes.insert({
      text:text,
      createdAt: new Date()
    });


    target.text.value=" ";

    $('#addModal').modal("close");
    return false;
  }
});

Template.note.events({
  "click .delete-note" : function(){
    Notes.remove(this._id);

    return false;

  }
})