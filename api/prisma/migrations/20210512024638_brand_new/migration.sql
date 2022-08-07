-- CreateTable
CREATE TABLE "Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Country" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iso" TEXT NOT NULL,
    "worldometersSlug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "DailyCount" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalCases" INTEGER NOT NULL,
    "newCases" INTEGER NOT NULL,
    "currentlyInfected" INTEGER NOT NULL,
    "totalDeaths" INTEGER NOT NULL,
    "newDeaths" INTEGER NOT NULL,
    "dayId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    FOREIGN KEY ("dayId") REFERENCES "Day" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Day.date_unique" ON "Day"("date");

-- CreateIndex
CREATE UNIQUE INDEX "Country.iso_unique" ON "Country"("iso");

-- CreateIndex
CREATE UNIQUE INDEX "Country.worldometersSlug_unique" ON "Country"("worldometersSlug");
