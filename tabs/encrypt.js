// Store some data on the server bound to the tresor, retrievable later by the id
function store(tresorId, dataId, data) {
  // Store data id in session storage for later prefills
  sessionStorage.setItem("dataId", dataId);

  // Store the data on the application server
  serverCall(
    "data/store?id=" + dataId,
    { tresorId: tresorId, data: data },
    function() {
      setMessage("#storeRes", "Stored successfully", null, false);
    },
    function(res) {
      setMessage("#storeRes", "Storage error", res, true);
    }
  );
}

// Encrypt a line of text
function encrypt(tresorId, text) {
  // Encypt the text through the sdk
  zkit_sdk.encrypt(tresorId, text).then(
    function(encryptedText) {
      // Store the encrypted text in session storage for later prefills.
      sessionStorage.setItem("cipherText", encryptedText);

      // Print results
      setMessage("#encResults", "Successfully encrypted text", encryptedText, false);
      $("#encNextStep").removeClass("hidden");
    },
    function(error) {
      setMessage("#encResults", "Encryption failed", error, true);
      $("#encNextStep").addClass("hidden");
    }
  );
}
