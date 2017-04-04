// Load login iframe into placeholder div tag
var zkit_login = zkit_sdk.getLoginIframe($("#zkitLogin")[0]);

// Start login process on button click
function login(userName) {
  // We have to first query the id of the user from the application server, since the SDK doesn't know the username.
  // We prefix the name with test-user- because we use auto validation which should only be done for test users if at all
  // This test-user behaviour is implemented in the example server and has nothing to do with the sdk, which has no notion of a test user

  serverCall(
    "user/get-user-id?userName=test-user-" + userName,
    null,
    function(res) {
      // Log in on the SDK
      return zkit_login.login(res).then(
        function(userId) {
          // Successful login
          // Write user's ID on page
          setMessage("#loginResults", "Logged in", userId, false);
          // Display logged in info
          $("#loggedIn").removeClass('hidden');
        },
        function(error) {
          setMessage("#loginResults", "Login failed", error, true);
          $("#loggedIn").addClass('hidden');
        }
      );
    },
    function(error) {
      setMessage("#loginResults", "Getting userId failed", error, true);
      $("#loggedIn").addClass('hidden');
    }
  );
}

function serverLogin() {
  idpLogin(
    function() {
      setMessage("#serverLoginResults", "Server login successful", null, false);
      $("#serverLoggedIn").removeClass('hidden');
    },
    function(error) {
      setMessage("#serverLoginResults", "Server login failed", error, true);
      $("#serverLoggedIn").addClass('hidden');
    }
  );
}

/**
 * We insert a hidden iframe into the site and do the IDP login process in that.
 * This is to work around the strange way Safari handles and also to avoid full page redirections.
 * @param onSuccess Called on success
 * @param onError Called on error
 */
function idpLogin(onSuccess, onError) {
  var iframe = document.createElement("iframe");
  iframe.className = "hidden";
  document.body.appendChild(iframe);

  iframe.onload = function() {
    var iframeLocation;
    try {
      iframeLocation = iframe.contentWindow.location;
      if (iframeLocation.origin !== window.location.origin) return false; // This will throw anyway...
    } catch (ex) {
      return false;
    }
    // We got back to the backend the same origin
    if (iframeLocation.pathname === location.pathname) {
      // Got back to the callback
      document.body.removeChild(iframe);
      // If the url contains error the login was unsuccessful
      if (iframeLocation.hash && iframeLocation.hash.indexOf("error") !== -1)
        return onError(iframeLocation.search.substr(1));

      // Success. The backend should've set a session cookie that it will use to authenticate every call
      onSuccess();
    }
  };

  // Set the iframe to the idp login url on the backend
  iframe.src = window.serverUrl + "/api/auth/login?clientId=" + encodeURIComponent(clientId) + "&reto=" + encodeURIComponent(location.href);
}
