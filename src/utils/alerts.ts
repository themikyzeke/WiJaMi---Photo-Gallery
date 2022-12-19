import Swal from "sweetalert2";

const baseAlert = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  backdrop: "none",
  timer: 1500,
  timerProgressBar: true,
});

export const successAlert = (text: string) => {
  baseAlert.fire({
    icon: "success",
    title: text,
  });
};

export const errorAlert = (text: string) => {
  baseAlert.fire({
    icon: "error",
    title: text,
  });
};
