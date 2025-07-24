const prisma = require("../prisma.ts");

async function getMaps(req, res) {
  try {
    const maps = await prisma.map.findMany({
      include: {
        characters: true,
        gameSessions: {
          orderBy: {
            endTime: "asc",
          },
          take: 5,
        },
      },
    });
    return res.json(maps);
  } catch (error) {
    return console.log("Error when getting maps: " + error);
  }
}

module.exports = {
  getMaps,
};
