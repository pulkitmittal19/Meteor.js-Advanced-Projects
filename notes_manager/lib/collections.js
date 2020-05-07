import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Notes = new Mongo.Collection("notes");

Meteor.methods({
    'notes.insert'(text){
        check(text, String);

        if(!Meteor.userId()){
          throw new Meteor.Error('not-authorized'); 
        }

        Notes.insert({
            text:text,
            createdAt: new Date(),
            owner: MediaStreamError.userId(),
            username: MediaStreamError.user().username,
          });
    },
    'notes.remove'(note){
        check(note._id,String);

        if(note.owner !== Meteor.userId()){
            throw new Meteor.Error('not-authorized')
        }

        Notes.remove(note._id);
    }





});