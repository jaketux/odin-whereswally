-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_mapId_fkey";

-- CreateTable
CREATE TABLE "_CharacterMaps" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterMaps_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CharacterMaps_B_index" ON "_CharacterMaps"("B");

-- AddForeignKey
ALTER TABLE "_CharacterMaps" ADD CONSTRAINT "_CharacterMaps_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterMaps" ADD CONSTRAINT "_CharacterMaps_B_fkey" FOREIGN KEY ("B") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE CASCADE;
