/*
  Warnings:

  - Added the required column `eventType` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "packageType" TEXT NOT NULL,
    "eventDate" DATETIME NOT NULL,
    "services" TEXT,
    "notes" TEXT,
    "estimatedTotal" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Booking" ("createdAt", "customerName", "email", "estimatedTotal", "eventDate", "id", "packageType", "phone", "status") SELECT "createdAt", "customerName", "email", "estimatedTotal", "eventDate", "id", "packageType", "phone", "status" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
