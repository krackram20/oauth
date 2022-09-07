import { prisma } from "../../../prisma/share-client";



export default async function handler(req, res) {
    const {p} = req.body;

    const deleteUser = await prisma.datasets.deleteMany({
        where: {
        name: {
            contains: p
        }
        },
      })
    res.json(deleteUser);
  }