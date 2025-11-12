import { toast } from "sonner";

export const deleteAllStudents = async (userId: string | null) => {
  if (!userId) return;
  try {
    const response = await fetch(`/api/admins/${userId}/students`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Succesfully deleted");
      location.reload();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error ocurred");
  }
};

export const deleteAllCourses = async (userId: string | null) => {
  if (!userId) return;
  try {
    const response = await fetch(`/api/admins/${userId}/courses`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success("Succesfully deleted");
      location.reload();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
    toast.error("An error ocurred");
  }
};
