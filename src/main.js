import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './search.js';
import { Doctor } from './doctor.js';

$(document).ready(function() {
  let AllDoctors = new Search("Smith", "Portland");
  let listOfDoctors = [];
  let newDoctor;
  let promise = AllDoctors.GetAllDoctors();
  promise.then(function(response) {
    let body = JSON.parse(response);
    for(let i = 0; i < body.length; i++) {
      newDoctor = new Doctor(body[i].id, body[i].first_name, body[i].last_name, body[i].weight_class, body[i].thumbnail)
      listOfDoctors.push(newDoctor);
    }

  })
});
