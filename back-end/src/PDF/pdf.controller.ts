import { Controller, Get, Param, Post, UseInterceptors, UploadedFiles, Response,UploadedFile,HttpException,HttpStatus } from "@nestjs/common";
// import { RedisInterceptor } from "src/Interceptor/Redis";
// import { SendInterceptor } from "src/Interceptor/Send";
import { PDFService } from "./pdf.service";
import { GridFSBucket } from "mongodb";
import { GridFsStorage } from 'multer-gridfs-storage'
import { Grid } from 'gridfs-stream'
import path from "path";
import crypto from 'crypto'
import multer from 'multer'
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBadRequestResponse,ApiConsumes,ApiTags  } from "@nestjs/swagger";
import { FileResponseVm } from "./FileResponseVM";

@Controller('pdf')
@ApiTags('Attachments')
export class PDFController {
    constructor(private pdfService: PDFService) { }

    @Post('/mongo/upload')
    @ApiConsumes('multipart/form-data')
    // @ApiImplicitFile({name: 'file', required: true, description: 'Attachment Files'})

    @UseInterceptors(FilesInterceptor('file'))
    async upload(@UploadedFiles() files) {
        // console.log(files);
        const response = [];
        await files.forEach(file => {
            const fileReponse = {
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                id: file.id,
                filename: file.filename,
                metadata: file.metadata,
                bucketName: file.bucketName,
                chunkSize: file.chunkSize,
                size: file.size,
                md5: file.md5,
                uploadDate: file.uploadDate,
                contentType: file.contentType,
            };
            response.push(fileReponse);
            
        });
        console.log(response);
        
        return response
        
    }

    @Get('/mongo/upload/:id')
    // @ApiBadRequestResponse({ type: ApiException })
    async getFile(@Param('id') id: string, @Response() res) {       
        console.log(id);
         
        const file = await this.pdfService.findInfo(id)
        const filestream = await this.pdfService.readStream(id)
        if(!filestream){
            throw new HttpException('An error occurred while retrieving file', HttpStatus.EXPECTATION_FAILED)
        }
        res.header('Content-Type', file.contentType);
        return filestream.pipe(res)
    }


    // @Get('/mongo/upload/g')
    // @UseInterceptors(FileInterceptor('file'))
    // async upload(@UploadedFile() file):Promise<any> {
    //     const createFile = await this.pdfService.writeFile(file)
    // }
    
}