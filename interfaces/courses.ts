import { Prisma } from "@/app/generated/prisma/client";

export type CourseWithTotalStackEntries = Prisma.CourseGetPayload<{
  include: {
    stack: {
      select: {
        _count: {
          select: {
            stackEntries: true;
          };
        };
      };
    };
  };
}>;
