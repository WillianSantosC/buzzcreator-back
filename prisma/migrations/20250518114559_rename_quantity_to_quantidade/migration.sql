/*
  Warnings:

  - You are about to drop the column `quantity` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "quantity",
ADD COLUMN     "quantidade" INTEGER NOT NULL;
