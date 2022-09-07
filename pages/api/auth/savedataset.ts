import { prisma } from "../../../prisma/share-client";

export default async function handler(req, res) {
    const { jsonCol, jsonRow, dfName, email, concat} = req.body;
    
    if(!dfName) {
        res.status(422).json({ message: 'Invalid Data'});
        return;
    }

    const result = await prisma.datasets.create({
      data: {
           name: concat,
           columns: jsonCol,
           rows: jsonRow,
           owner: email, 
           concat: dfName
        },
      },
    );
    res.json(result);
  }