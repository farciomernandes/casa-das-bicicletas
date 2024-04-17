import { ProxySendMessage } from '@/core/domain/protocols/aws/sns-send-message';
import { ConfigService } from '@nestjs/config';

export class SnsProxyMock implements ProxySendMessage {
  private topicArn: string;

  constructor(private readonly configService: ConfigService) {
    this.topicArn = 'AWS_SNS_TOPIC_CATALOG_ARN';
  }

  async sendSnsMessage(payloa: any, type: string): Promise<string> {
    const fakeData = {
      MessageId: 'fakeMessageId123',
    };

    return Promise.resolve(fakeData.MessageId);
  }
}

export const makeSnsProxyMock = (
  configService: ConfigService,
): ProxySendMessage => {
  return new SnsProxyMock(configService);
};
