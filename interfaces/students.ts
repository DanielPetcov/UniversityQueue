import { Prisma } from "@/app/generated/prisma/client";

export type StudentWithUser = Prisma.StudentGetPayload<{
  include: {
    user: {
      omit: {
        password: true;
      };
    };
  };
}>;

export interface StudentSignInResponse {
  userId: string;
  userName: string;
}
