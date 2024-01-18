import cogoToast from "cogo-toast";

class Toaster {
  success = (message) => {
    let options = {
      position: "top-center",
      heading: "Success",
      hideAfter: 5,
    };
    cogoToast.success(message, options);
  };

  loading = (message) => {
    let options = {
      position: "top-right",
      heading: "Loading",
      hideAfter: 5,
    };
    cogoToast.loading(message, options);
  };

  error = (message) => {
    let options = {
      position: "top-center",
      heading: "Error",
      hideAfter: 5,
      bar: {
        size: "10px",
      },
    };
    cogoToast.error(message, options);
  };

  info = (message) => {
    let options = { position: "top-right", heading: "Info", hideAfter: 5 };
    cogoToast.info(message, options);
  };
}

export const toast = new Toaster();
