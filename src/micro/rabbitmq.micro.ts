import * as Rabbit from 'rabbit.js';
import * as Config from 'config';
import { Server, CustomTransportStrategy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateShopDto } from '../dto';

export class RabbitMqMicro extends Server implements CustomTransportStrategy {

    private readonly context: Rabbit.Context;
    private readonly channel: string;

    constructor() {
        super();
        const { host, prefix, channel } = Config.get('mq.rabbitmq');
        this.context = Rabbit.createContext(host);
        this.channel = prefix + channel;
    }

    public async listen() {
        this.context.on('ready', () => {
            const worker = this.context.socket<Rabbit.WorkerSocket>('WORKER', {
                routing: 'direct',
                prefetch: 1,
            });
            worker.connect(this.channel, () => {
                console.log(`MQ connected ${this.channel}`);
                worker.on('data', async chunk => {
                    console.log('get mq data');
                    await this.handleMessage(chunk, async () => {
                        await worker.ack();
                        console.log('worker acked');
                    });
                });
            });
        });
    }

    public close() {
        this.context && this.context.close(() => {
            console.log('Mq Close');
        });
    }

    private async handleMessage(content: any, ack) {
        const dto: CreateShopDto = JSON.parse(content.toString());
        // const handlers = this.getHandlers();
        const pattern = JSON.stringify('create');
        if (!this.messageHandlers[pattern]) {
            return;
        }
        const handler = this.messageHandlers[pattern];
        const response$ = this.transformToObservable(await handler(dto)) as Observable<any>;
        response$ && await ack();
    }

    public push(data: object) {
        const send: any = this.context.socket('PUSH', { routing: 'direct', prefetch: 1 });
        send.connect(this.channel, () => {
            send.write(JSON.stringify(data), 'utf8');
        });
    }
}