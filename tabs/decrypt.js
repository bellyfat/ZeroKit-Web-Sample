function decrypt(text) {
  //Decrypt the copied cipherText
  zkit_sdk.decrypt(text).then(
    function(decrText) {
      // Success
      setMessage("#decryptionResults", "Successful decryption", decrText, false);
      $("#decNextStep").removeClass("hidden");
    },
    function(error) {
      // Failure
      setMessage("#decryptionResults", "Decryption failed", error, true);
      $("#decNextStep").addClass("hidden");
    }
  );
}

function getData(dataId) {
  serverCall(
    "data/get?id=" + dataId,
    null,
    function(res) {
      setMessage("#decryptionResults", "Successfully downloaded data", res, false);
      sessionStorage.setItem("cipherText", res);
      $("#encryptedText").val(res);

      $("#decNextStep").addClass("hidden");
    },
    function(res) {
      setMessage("#decryptionResults", "Data download error", res, true);
      $("#decNextStep").addClass("hidden");
    }
  );
}
