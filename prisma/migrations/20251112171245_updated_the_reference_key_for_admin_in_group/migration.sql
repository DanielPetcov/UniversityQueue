-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_adminKey_fkey";

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_adminKey_fkey" FOREIGN KEY ("adminKey") REFERENCES "Admin"("adminKey") ON DELETE CASCADE ON UPDATE CASCADE;
