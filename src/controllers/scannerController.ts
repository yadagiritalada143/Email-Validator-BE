import { Request, Response } from 'express';

const scanFile = (req: Request, res: Response) => {
    console.log('Heyy !!')
    res.status(200).send(`File Uploaded Success !!`);
}

export default { scanFile }