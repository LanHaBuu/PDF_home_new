import { Injectable, NestInterceptor, ExecutionContext, CallHandler, StreamableFile } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SendInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<any> {
        const res = context.switchToHttp().getResponse()
        return next
            .handle()
            .pipe(
                tap((result) => {
                    res.setHeader("Content-Disposition","inline; filename=\"MyFile.pdf\"");
                    res.setHeader('Content-Type', 'application/pdf');
                    // res.setHeader('Content-Type', 'application/octet-stream');
                    // return new StreamableFile(result);
                    return  res.send(result)
                }),
            );
    }
}