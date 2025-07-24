const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.character.deleteMany();
  await prisma.map.deleteMany();

  const maps = [
    {
      id: 1,
      name: "Ali Baba and the Forty Thieves",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20ali%20barbar%20resized.jpeg",
      mapTagline: "Find Wally in the packed cave amidst the pots of treasure.",
      coordinatesWally: [711, 745, 210, 261],
      //[left, right, top, bottom]
      coordinatesWoof: null,
      coordinatesWizard: null,
      coordinatesOdlaw: null,
      coordinatesWenda: null,
    },
    {
      id: 2,
      name: "Horseplay at Troy",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20horseplay%20at%20troy%20resized.jpeg",
      mapTagline: "Find Wally as he takes cover amongst the Battle of Troy.",
      coordinatesWally: [320, 370, 410, 470],
      coordinatesWoof: null,
      coordinatesWizard: null,
      coordinatesOdlaw: null,
      coordinatesWenda: null,
    },
    {
      id: 3,
      name: "The Knights of the Magic Flag",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20the%20knights%20of%20the%20magic%20flag%20resized.jpeg",
      mapTagline:
        "Find Wally and Odlaw as they hide within the two armies with magic flags.",
      coordinatesWally: [445, 495, 245, 325],
      coordinatesWoof: null,
      coordinatesWizard: null,
      coordinatesOdlaw: [55, 105, 345, 405],
      coordinatesWenda: null,
    },
    {
      id: 4,
      name: "Department Store",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20department%20store%20resized.jpeg",
      mapTagline: "Find Wally, Woof and Wizard inside the department store.",
      coordinatesWally: [200, 260, 155, 225],
      coordinatesWoof: [555, 595, 520, 550],
      coordinatesWizard: [675, 720, 2, 65],
      coordinatesOdlaw: null,
      coordinatesWenda: null,
    },
    {
      id: 5,
      name: "Deep Sea Divers",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20deep%20sea%20divers%20resized.jpeg",
      mapTagline:
        "Find Wally, Woof, Wizard and Wenda as they brave the depths.",
      coordinatesWally: [506, 550, 152, 217],
      coordinatesWoof: [1117, 1159, 335, 381],
      coordinatesWizard: [777, 830, 110, 181],
      coordinatesOdlaw: null,
      coordinatesWenda: [181, 235, 268, 340],
    },
    {
      id: 6,
      name: "Dinosaurs, Spacemen and Ghouls",
      mapImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/maps//waldo%20dinosaurs,%20spacemen%20and%20ghouls%20resized.jpeg",
      mapTagline:
        "Find Wally, Woof, Wizard and Wenda on the set of their new movie.",
      coordinatesWally: [1061, 1107, 135, 190],
      coordinatesWoof: [820, 865, 618, 650],
      coordinatesWizard: [520, 580, 360, 420],
      coordinatesOdlaw: null,
      coordinatesWenda: [870, 915, 165, 212],
    },
  ];

  const createdMaps = await prisma.map.createMany({
    data: maps,
  });

  const wally = await prisma.character.create({
    data: {
      id: 1,
      name: "Wally",
      characterImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wally.png",
      maps: {
        connect: [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
          { id: 6 },
        ],
      },
    },
  });

  const woof = await prisma.character.create({
    data: {
      id: 2,
      name: "Woof",
      characterImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//woof.png",
      maps: {
        connect: [{ id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });

  const wizard = await prisma.character.create({
    data: {
      id: 3,
      name: "Wizard",
      characterImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wizard.png",
      maps: {
        connect: [{ id: 4 }, { id: 5 }, { id: 6 }],
      },
    },
  });

  const wenda = await prisma.character.create({
    data: {
      id: 4,
      name: "Wenda",
      characterImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//wenda.png",
      maps: {
        connect: [{ id: 5 }, { id: 6 }],
      },
    },
  });

  const odlaw = await prisma.character.create({
    data: {
      id: 5,
      name: "Odlaw",
      characterImage:
        "https://izyatngyyeoiexwfghkw.supabase.co/storage/v1/object/public/characters//odlaw.png",
      maps: {
        connect: [{ id: 3 }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

module.exports = prisma;
