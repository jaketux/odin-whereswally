const prisma = require("../prisma.ts");

async function startSession(req, res) {
  try {
    const { mapId } = req.body;

    const newSession = await prisma.gameSession.create({
      data: {
        mapId,
      },
    });

    return res.json(newSession);
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error when creating new game session: " + error });
  }
}

async function endSession(req, res) {
  try {
    const { gameSessionId, endTime, username, mapId } = req.body;

    const existingGameSession = await prisma.gameSession.findUnique({
      where: {
        id: gameSessionId,
      },
    });

    if (!existingGameSession) {
      return res.status(500).json({
        message: "Unable to find game session with the provided session ID.",
      });
    }

    const updatedGameSession = await prisma.gameSession.update({
      where: {
        id: gameSessionId,
      },
      data: { endTime, username, mapId, completed: true },
    });

    if (!updatedGameSession) {
      return res
        .status(500)
        .json({ message: "Error when updating existing game session. " });
    }

    const updatedSessions = await prisma.gameSession.findMany({
      orderBy: {
        endTime: "asc",
      },
      take: 5,
      include: {
        maps: true,
      },
    });

    return res.json(updatedSessions);
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Error when ending existing game session: " + error });
  }
}

module.exports = {
  startSession,
  endSession,
};
