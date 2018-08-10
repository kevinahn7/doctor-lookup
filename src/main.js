import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Doctor } from './search.js';

$(document).ready(function() {
  let listOfDoctors = new Doctor();
  let promise = listOfDoctors.GetAllDoctors();
});
