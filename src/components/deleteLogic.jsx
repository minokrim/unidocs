import axios from "axios";
import Swal from "sweetalert2";
export const deleteItem = async ({ type, id }) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  try {
    const result = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      axios.post(`http://localhost:5000/document/delete/${type}`, {
        fileId: id,
      });
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire("Cancelled", "Your file is safe ", "error");
    }
  } catch (error) {
    console.error("Deletion failed:", error);
    Swal.fire(
      "Error",
      "Something went wrong while deleting the file.",
      "error"
    );
  }
};
