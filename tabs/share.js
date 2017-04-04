function share(tresorId, userName) {
  if (!tresorId || !userName)
    return setMessage("#shareResults", "Share failed", "Neither parameter can be empty!", true);

  serverCall(
    "user/get-user-id?userName=test-user-" + userName,
    null,
    function(res) {
      // Share the tresor in the SDK using the retrieved user id
      return zkit_sdk.shareTresor(tresorId, res).then(
        function(operationId) {
          // Successful share
          // Register the share on the application backend. In the example it is automatically approved.
          serverCall(
            "tresor/invited-user",
            { operationId: operationId },
            function() {
              setMessage("#shareResults", "Successful invitation", null, false);
            },
            function(error) {
              setMessage("#shareResults", "Share approval failed", error, true);
            }
          );
        },
        function(error) {
          setMessage("#shareResults", "Share failed", error, true);
        }
      );
    },
    function(error) {
      setMessage("#shareResults", "Getting userId failed", error, true);
    }
  );
}
