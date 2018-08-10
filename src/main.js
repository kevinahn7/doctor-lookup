import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './search.js';

$(document).ready(function() {
  $(".clearAll").click(function() {
    $(".resultsGrid").text("");
    $(".noResult").text("");
    $(".clearAll").hide();
  });
  $(".findDoctors").submit(function(e) {
    $(".resultsGrid").text("");
    $(".noResult").text("");
    $(".clearAll").show();
    e.preventDefault();
    let name = $(".name").val();
    let condition = $(".condition").val();
    let location = $(".location").val();
    let AllDoctors = new Search(name, condition, location);
    let promise = AllDoctors.GetDoctors();
    promise.then(function(response) {
      let body = response.data;
      if (body.length) {
        for (let x = 0; x < body.length; x++) {
          let phoneNumberArray = (body[x].practices[0].phones[0].number).split("");
          let address = body[x].practices[0].visit_address;
          let profile = body[x].profile;
          let website = body[x].practices[0].website;
          if (body[x].practices[0].website) {
            $(".resultsGrid").append(
              `<div class="cell">
                <p><img src='${profile.image_url}'</p>
                <p class="theName">${profile.first_name} ${profile.last_name}</p>
                <p class="practiceName">${body[x].practices[0].name}</p>
                <p>${address.city}</p>
                <p>${address.street}</p>
                <p>${address.state}</p>
                <p>${address.zip}</p>
                <p>${phoneNumberArray[0]}${phoneNumberArray[1]}${phoneNumberArray[2]}-${phoneNumberArray[3]}${phoneNumberArray[4]}${phoneNumberArray[5]}-${phoneNumberArray[6]}${phoneNumberArray[7]}${phoneNumberArray[8]}${phoneNumberArray[9]}</p>
                <p><a href="${website}" target="_blank">${website}<a></p>
              </div>`
            );
          } else {
            $(".resultsGrid").append(
              `<div class="cell">
                <p><img src='${profile.image_url}'</p>
                <p class="theName">${profile.first_name} ${profile.last_name}</p>
                <p class="practiceName">${body[x].practices[0].name}</p>
                <p>${address.city}</p>
                <p>${address.street}</p>
                <p>${address.state}</p>
                <p>${address.zip}</p>
                <p>${phoneNumberArray[0]}${phoneNumberArray[1]}${phoneNumberArray[2]}-${phoneNumberArray[3]}${phoneNumberArray[4]}${phoneNumberArray[5]}-${phoneNumberArray[6]}${phoneNumberArray[7]}${phoneNumberArray[8]}${phoneNumberArray[9]}</p>
              </div>`
            );
          }
        }
      } else {
        $(".noResult").append("<p>There are no matching doctors with your input</p>");
      }
    }, (error) => {
      $(".noResult").text(`There was an error processing your request: ${error.message}`);
    });
  });
});
