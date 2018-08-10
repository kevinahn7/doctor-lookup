import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Search } from './search.js';

$(document).ready(function() {
  $(".findDoctors").submit(function(e) {
    $(".resultsGrid").text("");
    $(".noResult").text("");
    e.preventDefault();
    let name = $(".name").val();
    let condition = $(".condition").val();
    let AllDoctors = new Search(name, condition, "Portland");
    let promise = AllDoctors.GetDoctors();
    promise.then(function(response) {
      let body = response.data;
      if (body.length) {
        for (let x = 0; x < body.length; x++) {
          if (body[x].practices[0].website) {
            let phoneNumberArray = (body[x].practices[0].phones[0].number).split("");
            $(".resultsGrid").append(
              `<div class="cell">
                <p><img src='${body[x].profile.image_url}'</p>
                <p>${body[x].profile.first_name} ${body[x].profile.last_name}</p>
                <p>${body[x].practices[0].visit_address.city}</p>
                <p>${body[x].practices[0].visit_address.street}</p>
                <p>${body[x].practices[0].visit_address.state}</p>
                <p>${body[x].practices[0].visit_address.zip}</p>
                <p>${phoneNumberArray[0]}${phoneNumberArray[1]}${phoneNumberArray[2]}-${phoneNumberArray[3]}${phoneNumberArray[4]}${phoneNumberArray[5]}-${phoneNumberArray[6]}${phoneNumberArray[7]}${phoneNumberArray[8]}${phoneNumberArray[9]}</p>
                <p><a href="${body[x].practices[0].website}" target="_blank">${body[x].practices[0].website}<a></p>
              </div>`
            );

          } else {
            let phoneNumberArray = (body[x].practices[0].phones[0].number).split("");
            $(".resultsGrid").append(
              `<div class="cell">
                <p><img src='${body[x].profile.image_url}'</p>
                <p>${body[x].profile.first_name} ${body[x].profile.last_name}</p>
                <p>${body[x].practices[0].visit_address.city}</p>
                <p>${body[x].practices[0].visit_address.street}</p>
                <p>${body[x].practices[0].visit_address.state}</p>
                <p>${body[x].practices[0].visit_address.zip}</p>
                <p>${phoneNumberArray[0]}${phoneNumberArray[1]}${phoneNumberArray[2]}-${phoneNumberArray[3]}${phoneNumberArray[4]}${phoneNumberArray[5]}-${phoneNumberArray[6]}${phoneNumberArray[7]}${phoneNumberArray[8]}${phoneNumberArray[9]}</p>
              </div>`
            );
          }
        }
      } else {
        $(".noResult").append("<p>There are no matching doctors with your input</p>");
      }
    });
  });

});
