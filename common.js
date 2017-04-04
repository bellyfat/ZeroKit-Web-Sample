/*
  Here we are dynamically adding the script tag loading the sdk.
  Outside of this example you would most likely not do this dynamically, it's done this way to
  centralize all configuration into a single variable
 */
$.holdReady(true);
//$.getScript(serverUrl + "/zkit-sdk.js", function () {
$.getScript(window.serverUrl + "/zkit-sdk.js", function() {
  zkit_sdk.whoAmI().then(function(id) {
    if (id) $("#logoutBtn").removeClass("hidden");

    $("#loader").addClass("hidden");
    $(".main").removeClass("hidden");

    $.holdReady(false);
  });
});

/**
 * Logs out from the server side
 */
window.serverLogout = function() {
  zkit_sdk.logout();
  serverCall("auth/logout", null, function() {
    $("#logoutBtn").addClass("hidden");
  });
};

/**
 * Sets the message in a specifically set up div
 * @param selector Selector of the root div
 * @param header Header text
 * @param message Message text
 * @param isError Is error message.
 */
window.setMessage = function(selector, header, message, isError) {
  $(selector).find(".header").text(header);

  var body = $(selector).find(".body");
  body.text(typeof message !== "string" ? JSON.stringify(message, null, 2) : message);
  if (message === null) body.addClass("hidden");
  else body.removeClass("hidden");

  $(selector).removeClass("hidden").addClass("visible");
  $(selector).removeClass(!isError ? "error" : "success").addClass(isError ? "error" : "success");
};

/**
 * A simple convenience function to make a call to the example application server.
 * @param urlPart URL
 * @param obj Object to post
 * @param resolve Called on success
 * @param reject Called on failure
 */
window.serverCall = function(urlPart, obj, resolve, reject) {
  var xhr = new XMLHttpRequest();
  // Needed for server side authentication
  xhr.withCredentials = true;
  xhr.open(obj ? "POST" : "GET", serverUrl + "/api/" + urlPart);
  xhr.onload = function() {
    if (this.status >= 200 && this.status < 300) {
      if (resolve) {
        resolve(JSON.parse(xhr.responseText || "null"));
      }
    } else {
      if (reject) {
        var resp;
        try {
          resp = JSON.parse(xhr.responseText);
        } catch (eX) {
          resp = xhr.responseText;
        }
        reject({
          status: this.status,
          statusText: xhr.statusText,
          response: resp
        });
      }
    }
  };
  xhr.onerror = function() {
    if (reject) {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    }
  };
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.send(obj ? JSON.stringify(obj) : null);
};
