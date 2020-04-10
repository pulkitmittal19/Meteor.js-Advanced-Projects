import { Template } from 'meteor/templating';

import './main.html';

Template.note.helpers({
  notes: [
    {text: "My Note 1"}]
})