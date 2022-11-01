import { Module } from "@nestjs/common";
import { PDFController } from "./pdf.controller";
import { PDFService } from "./pdf.service";
import { GridFsMulterConfigService } from "src/Interceptor/GridFs";
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PDFEntity } from "./pdf.entity";
import { MongooseModule } from "@nestjs/mongoose";
@Module({
    imports: [
        MulterModule.registerAsync({
            useClass: GridFsMulterConfigService,
        }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/file')
    ],
    // imports: [TypeOrmModule.forFeature([PDFEntity])],
    // imports: [)],
    controllers: [PDFController],
    providers: [PDFService,GridFsMulterConfigService]
})
export class PDFModule { }