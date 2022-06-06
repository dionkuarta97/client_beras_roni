import Swal from "sweetalert2";

export function alertSuccess(text) {
  Swal.fire({
    title: text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
}

export function alertError(text) {
  Swal.fire({
    title: text,
    icon: "error",
    timer: 2000,
    showConfirmButton: false,
  });
}

export function alertErrorDua(text) {
  Swal.fire({
    title: "opsss",
    text: text,
    icon: "error",
  });
}

export async function alertSure() {
  const result = await Swal.fire({
    title: "Are you Sure ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sure",
  });
  return result;
}

export function alertLoading() {
  Swal.fire({
    title: "Loading...",
    html: "Please wait...",
    allowEscapeKey: false,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
}

export function alertCloseLoading() {
  Swal.close();
}
