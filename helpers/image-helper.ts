import { mkdir, writeFile } from 'fs/promises';
import { put } from '@vercel/blob';
import path from 'path';

// export async function saveImage(image: File): Promise<string> {
//   const bytes = await image.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const uploadDir = path.join(process.cwd(), 'public', 'img', 'foods');

//   await mkdir(uploadDir, { recursive: true });

//   const extension = path.extname(image.name);
//   const fileName = `${crypto.randomUUID()}${extension}`;

//   const uploadPath = path.join(uploadDir, fileName);

//   await writeFile(uploadPath, buffer);

//   return `/img/foods/${fileName}`;
// }

export async function saveImage(image: File): Promise<string> {
  const extension = image.name.split('.').pop() ?? 'png';

  const fileName = `foods/${crypto.randomUUID()}.${extension}`;

  const blob = await put(fileName, image, {
    access: 'public',
    addRandomSuffix: false,
    contentType: image.type,
  });

  return blob.url;
}
