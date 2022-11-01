import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisInterceptor implements NestInterceptor {
    constructor(@InjectRedis() private readonly redis: Redis) { }


    sleep(ms: number): Promise<unknown | any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        let req = context.switchToHttp().getRequest();
     
        const { url } = req.params
        const data = await this.redis.getBuffer(url)
        if (data) {
            return of(data)
        }
        if (await this.redis.set(url+'key', 1,'EX',10,'NX')) {
            return next
                .handle()
                .pipe(
                    tap(async(result) => {                       
                        this.redis.set(url, result)
                        this.redis.del(url+'key')
                        return result
                    }),
                );
        }
        await this.sleep(500)
        return this.intercept(context, next)
    }
}