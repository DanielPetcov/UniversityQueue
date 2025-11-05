import { toast } from "sonner";

// delete all items based on key
export const deleteAll = async (key: string) => {
  const response = await fetch(`/api/${key}`, {
    method: "DELETE",
  });
  if (response.ok) {
    toast.success("Succesfully deleted");
    location.reload();
  } else {
    toast.error("Something went wrong");
  }
};
