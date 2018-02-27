/*
Instructions:
(1) Wrap an XHR in a Promise in the get() function below. See: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
  (a) Resolve on load and reject on error.
(2) If the XHR resolves, use addSearchHeader to add the search header to the page.
(3) If the XHR fails, console.log the error and pass 'unknown' to addSearchHeader
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} response - The unparsed JSON response from get.
   */
  function addSearchHeader(response) {
    try {
      response = JSON.parse(response).query;  // you'll be moving this line out of here in the next quiz!
    } catch (e) {
      // it's 'unknown', so leave it alone
    }
    home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  
  function get(url) {

    //fetch api
   

    /*
    This code needs to get wrapped in a Promise!
     */
    var req = new XMLHttpRequest();
    req.open('GET', url);
    var promise = new Promise(function(resolve,reject){
    
      req.onload = function() {
        if (req.status === 200) {
          // It worked!
          // You'll want to resolve with the data from req.response
          resolve(req.response);
        } else {
          // It failed :(
          // Be nice and reject with req.statusText
          reject(req.statusText);
        }
      };
 
   
   
      req.onerror = function() {
        // It failed :(
        // Pass a 'Network Error' to reject
        reject('Network Error');
      };
      req.send();
    });
    
    return promise;
  }

   /**
   * XHR wrapped in a promise
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url, {
      method: 'get'
    });
  }
  
  
  /**
   * Performs an XHR for a JSON and returns a parsed JSON response.
   * @param  {String} url - The JSON URL to fetch.
   * @return {Promise}    - A promise that passes the parsed JSON response.
   */
  function getJSON(url) {
    return get(url).then(function(response) {
      return response.json();
    });
  }
/**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line and start here when you're ready to add the first thumbnail!
    Your code goes here!
     */
    getJSON('../data/earth-like-results.json')
    .then(function(response){
      
      response.results.map(function(url){
        getJSON(url).then(createPlanetThumb);
      });
    })
  });
})(document);
