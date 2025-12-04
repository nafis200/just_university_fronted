
import { toast } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

export const showToast = (
  message: string,
  type: ToastType = "success",
  description?: string
) => {
  switch (type) {
    case "success":
      toast.success(message, {
        description: description,
      });
      break;

    case "error":
      toast.error(message, {
        description: description,
      });
      break;

    case "warning":
      toast.warning(message, {
        description: description,
      });
      break;

    case "info":
      toast(message, {
        description: description,
      });
      break;

    default:
      toast(message);
  }
};
