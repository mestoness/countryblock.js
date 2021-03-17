const countryBlock = (userSettings) => {
    "use strict";
    var extend = function(defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };
    var settingsAll = extend({
        status: null,
        country: null,
        locationHref: null
    }, userSettings);
    if (settingsAll.status == true && settingsAll.country != null) {
        var countryBannedJSreq = new XMLHttpRequest;
        countryBannedJSreq.open("GET", "http://ip-api.com/json/?fields=countryCode", true),
            countryBannedJSreq.onload = function() {
                if (countryBannedJSreq.status === 200) {
                    var responseJson = JSON.parse(countryBannedJSreq.responseText);
                    if (responseJson.countryCode != null) {
                        if (settingsAll.country.indexOf(responseJson.countryCode) !== -1) {
                            document.querySelector("html").remove();
                            if (settingsAll.locationHref != null) {
                                location.href = settingsAll.locationHref;
                            }
                        }
                    }
                    else{
                          if (settingsAll.locationHref != null) {
                              location.href = settingsAll.locationHref;
                          }
                          document.querySelector("html").remove();
                        }  
                } else {
                    console.log("API error");
                }
            },
            countryBannedJSreq.onerror = function() {},
            countryBannedJSreq.send();
    }
}