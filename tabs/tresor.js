function createTresor() {
  zkit_sdk.createTresor().then(
    function(tresorId) {
      serverCall(
        "tresor/created",
        { tresorId: tresorId },
        function() {
          setMessage("#createResults", "Tresor registered", tresorId, false);
          sessionStorage.setItem("tresorId", tresorId);
          $("#tresorNextStep").removeClass("hidden");
        },
        function(err) {
          setMessage("#createResults", "Tresor Registration failed", err, true);
          $("#tresorNextStep").addClass("hidden");
        }
      );
    },
    function(err) {
      setMessage("#createResults", "Tresor creation failed", err, true);
      $("#tresorNextStep").addClass("hidden");
    }
  );
}
