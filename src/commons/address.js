export const openPostcode = (callback) => {
  new window.daum.Postcode({
    oncomplete: function (data) {
      const address = data.roadAddress;  
      const postcode = data.zonecode;     
      callback({ address, postcode });
    },
  }).open();
};
