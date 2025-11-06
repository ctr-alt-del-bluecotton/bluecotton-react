export const openPostcode = (callback) => {
  new window.daum.Postcode({
    oncomplete: function(data) {
      const address = data.roadAddress;
      callback(address);
    }
  }).open();
};
