-- CreateTable
CREATE TABLE "HallDetails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL
);
