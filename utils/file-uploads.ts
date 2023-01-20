import { extname } from "path";
import { v4 as uuidv4 } from 'uuid';

const uuid=uuidv4();

export const editFileName = (req, file, callback) => {
    const uuid=uuidv4();
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    // let finalName = `${name}-${randomName}${fileExtName}`  this
    // let finalName=(file.originalname)
    let finalName=uuid;
    console.log({finalName})
    // return finalName
    // callback(null, `${name}-${randomName}${fileExtName}`);  this
    callback(null, `${finalName}`);
};