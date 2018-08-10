export class Search {
  constructor(search, location) {
    this.search = search;
    this.location = location
  }
  GetAllDoctors() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let apiKey = process.env.exports.apiKey;

      console.log(apiKey);

      let url = `https://api.betterdoctor.com/2016-03-01/doctors?name=&location=45.5122,-122.6587,100&skip=2&limit=10&user_key=${apiKey}`;
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
