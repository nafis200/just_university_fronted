// utils/showDeleteAlert.ts
import Swal from "sweetalert2";

export const showDeleteAlert = async (itemName: string) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `You won't be able to revert this!`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: "Deleted!",
      text: `${itemName || "Item"} has been deleted.`,
      icon: "success",
    });
    console.log("✅ Deleted:", itemName);
    return true;
  } else {
    console.log("❌ Cancelled");
    return false;
  }
};
