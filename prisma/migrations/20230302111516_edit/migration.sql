/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `EphemeralUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EphemeralUser_user_id_key` ON `EphemeralUser`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_user_id_key` ON `User`(`user_id`);
