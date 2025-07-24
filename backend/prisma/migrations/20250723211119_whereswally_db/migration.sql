-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mapImage" TEXT NOT NULL,
    "mapTagline" TEXT NOT NULL,
    "coordinatesWally" JSONB,
    "coordinatesWoof" JSONB,
    "coordinatesWizard" JSONB,
    "coordinatesOdlaw" JSONB,
    "coordinatesWenda" JSONB,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "characterImage" TEXT NOT NULL,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameSession" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "username" TEXT DEFAULT 'Anonymous',
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "mapId" INTEGER NOT NULL,

    CONSTRAINT "GameSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_mapId_fkey" FOREIGN KEY ("mapId") REFERENCES "Map"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
