// Get registration iframe;
var zkit_register = zkit_sdk.getRegistrationIframe($("#regIframe")[0]);

// Register user
function register(userName) {
  // Step 1: reserve a unique user ID for the registration
  // This is needed, since the sdk doesn't need to know about the username (a possibly sensitive info).
  // We prefix the name with test-user- because we use auto validation which should only be done for test users if at all
  // The autoValidate: true enables automatic validation (but only works for test users)
  // This test-user behaviour is implemented in the example server and has nothing to do with the sdk, which has no notion of a test user
  serverCall(
    "user/init-user-registration",
    { userName: "test-user-" + userName, profileData: JSON.stringify({ autoValidate: true }) },
    function(userIdResp) {
      // Step 2: register the user through the sdk
      return zkit_register.register(userIdResp.userId, userIdResp.regSessionId).then(
        function(succRegResp) {
          // Step 3: finish registration transaction
          serverCall(
            "user/finish-user-registration",
            {
              userId: userIdResp.userId,
              validationVerifier: succRegResp.RegValidationVerifier
            },
            function() {
              $("#registerResults").addClass("hidden");
              $("#nextStep").removeClass("hidden");
            },
            function(error) {
              $("#nextStep").addClass("hidden");
              setMessage("#registerResults", "Finishing registration failed", error, true);
            }
          );
        },
        function(error) {
          $("#nextStep").addClass("hidden");
          setMessage("#registerResults", "SDK registration failed", error, true);
        }
      );
    },
    function(error) {
      $("#nextStep").addClass("hidden");
      setMessage("#registerResults", "Initiating registration failed", error, true);
    }
  );
}
