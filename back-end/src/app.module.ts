import { Module } from '@nestjs/common';
import { PDFModule } from './PDF/pdf.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MongooseModule } from '@nestjs/mongoose'
import { TypeOrmModule } from '@nestjs/typeorm';



@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/file'),
    // RedisModule.forRoot({
    //   config: {
    //     host: 'localhost',
    //     port: 6379,
    //     password: 'authpassword'
    //   }
    // }),
    PDFModule],

})
export class AppModule { }
