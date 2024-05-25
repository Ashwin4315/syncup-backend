import { applyDecorators, BadRequestException, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';

export function UploadFile() {
  return applyDecorators(

    UseInterceptors(FileInterceptor('profilePhoto', {
      storage: multer.diskStorage({
        destination: './public/user', 
        filename: (req, file, callback) => {
          const timestamp = new Date().getTime(); 
          const ext = path.extname(file.originalname); 
          const filename = path.basename(file.originalname, ext); 
          const newFilename = `${timestamp}_${filename}${ext}`;
          callback(null, newFilename);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new BadRequestException('Only image files are allowed'), false);
        }
        callback(null, true);
      },
    })),

  );
}
