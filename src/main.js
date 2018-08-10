import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './search.js';
import { Doctor } from './doctor.js';

$(document).ready(function() {
  $(".findDoctors").submit(function(e) {
    e.preventDefault();
    let name = $(".name").val();
    let condition = $(".condition").val();
    let AllDoctors = new Search(name, condition, "Portland");
    let listOfDoctors = [];
    let newDoctor;
    let promise = AllDoctors.GetDoctors();
    promise.then(function(response) {
      let body = response.data;
      for (let x = 0; x < body.length; x++) {
        if (body[x].practices[0].website) {
          $(".results").append(`<p>${body[x].profile.first_name} ${body[x].profile.last_name}</p>
            <p><img src='${body[x].profile.image_url}'</p>
            <p><a href="${body[x].practices[0].website}" target="_blank">${body[x].practices[0].website}<a></p>`);
        } else {
          $(".results").append(`<p>${body[x].profile.first_name} ${body[x].profile.last_name}</p>
            <p><img src='${body[x].profile.image_url}'</p>`);
        }

      }

      // for(let i = 0; i < body.length; i++) {
      //   newDoctor = new Doctor(body[i].id, body[i].first_name, body[i].last_name, body[i].weight_class, body[i].thumbnail)
      //   listOfDoctors.push(newDoctor);
      // };
    });
  });

});
