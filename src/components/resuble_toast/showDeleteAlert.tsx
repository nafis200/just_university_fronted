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




interface DynamicAlertOptions {
  confirmTitle?: string;
  confirmText?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  successTitle?: string;
  successText?: string;
  icon?: "warning" | "info" | "success" | "error" | "question";
  itemName?: string;
}

export const showDynamicAlert = async ({
  confirmTitle = "Are you sure?",
  confirmText = "You won't be able to revert this!",
  confirmButtonText = "Yes",
  cancelButtonText = "Cancel",
  successTitle = "Deleted!",
  successText,
  icon = "warning",
  itemName,
}: DynamicAlertOptions) => {
  const result = await Swal.fire({
    title: confirmTitle,
    text: confirmText,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText,
    cancelButtonText,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      title: successTitle,
      text: successText || `${itemName || "Item"} has been deleted.`,
      icon: "success",
    });
    console.log("✅ Confirmed:", itemName);
    return true;
  } else {
    console.log("❌ Cancelled");
    return false;
  }
};
