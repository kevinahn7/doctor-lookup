export class Search {
  constructor(nameSearch, conditionSearch, location) {
    this.nameSearch = nameSearch;
    this.conditionSearch = conditionSearch;
    this.location = location;
  }

  GetDoctors() {
    let doctorName = this.nameSearch;
    let conditionName = this.conditionSearch;
    let location = this.location;
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let apiKey = process.env.exports.apiKey;
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${doctorName}&query=${conditionName}&location=${location},100&skip=2&limit=100&user_key=${apiKey}`;
      request.responseType = 'json';
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}
