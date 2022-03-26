import type { Game } from "@prisma/client";
import prisma from "../prisma/client";
export async function UpdateGame(game: Game) {
    game.updatedAt = new Date();
    const updatedGame: any = { ...game };
    updatedGame.id = undefined;
    await prisma.game.update({
        where: {
            id: game.id
        },
        data: updatedGame
    });
}

export interface NewGame extends Omit<Game, 'id' | 'createdAt' | 'updatedAt'> { }
export async function CreateGame(input: NewGame) {
    return await prisma.game.create({
        data: input
    });
}

export async function GetGame(gameId: string) {
    return await prisma.game.findUnique({
        where: {
            "id": gameId
        }
    });
}