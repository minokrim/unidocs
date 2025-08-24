import axios from "axios";
import Swal from "sweetalert2";
const DeleteItem = async ({ type, id,user }) => {
    console.log(user)

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  try {
    console.log(id)
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
     await axios.post(`http://localhost/${type}/document/delete/${type}`, {
        fileId: id,
        userId:user.user.id
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

export default DeleteItem; 
