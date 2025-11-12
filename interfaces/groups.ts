import { Prisma } from "@/app/generated/prisma/client";

export type GroupWithStudents = Prisma.GroupGetPayload<{
  include: {
    students: true;
  };
}>;

export type UpdateGroupName = {
  groupId: string;
  groupName: string;
};
