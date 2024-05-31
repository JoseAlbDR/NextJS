/*
  Warnings:

  - Made the column `address2` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "address2" SET NOT NULL,
ALTER COLUMN "address2" SET DEFAULT 'N/A';
