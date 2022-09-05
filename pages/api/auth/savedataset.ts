import { prisma } from "../../../prisma/share-client";

export default async function handler(req, res) {
    const { dataframe, dfName, email} = req.body;
    
    if(!dfName) {
        res.status(422).json({ message: 'Invalid Data'});
        return;
    }

    const result = await prisma.datasets.create({
      data: {
           name: dfName,
           dataset: dataframe,
           owner: email
        },
      },
    );
    res.json(result);
  }