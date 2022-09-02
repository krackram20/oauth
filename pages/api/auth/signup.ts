import { prisma } from "../../../prisma/share-client";
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
    const { name, email} = req.body;
    
    if(!email || !email.includes('@') || !name) {
        res.status(422).json({ message: 'Invalid Data'});
        return;
    }

    const userExists = await prisma.user.findMany({where: {email:email}})

    if (userExists.length > 0) {
        res.status(422).json({ message: 'User already exists' });
        console.log('user exits', userExists);
        

        return;
    }

    const result = await prisma.user.create({
      data: {
            email: email,
            name: await hash(name,12)
        },
      },
    );
    res.json(result);
  }