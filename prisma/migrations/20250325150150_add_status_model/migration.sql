-- CreateEnum
CREATE TYPE "State" AS ENUM ('BUSY', 'AVAILABLE', 'OUT_OF_OFFICE');

-- CreateEnum
CREATE TYPE "Forecast" AS ENUM ('FULL', 'DAY_TO_DAY', 'FREE');

-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'AVAILABLE',
    "hours" INTEGER NOT NULL DEFAULT 8,
    "forecast" "Forecast" NOT NULL DEFAULT 'FULL',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
