import { StatusCodes } from 'http-status-codes';
import { GroupID } from '../groups';
import { UserID } from '../users';
import { addCreationInfo, addModificationInfo, ApiError, Context } from '../utils';
import { MessageRepo } from './repository';
import { Message, ReceiverType } from './types';

export class MessageService {
  private messageRepo: MessageRepo;

  constructor(messageRepo: MessageRepo) {
    this.messageRepo = messageRepo;
  }

  public async send(ctx: Context, payload: { body: string; receiver: UserID | GroupID; receiverType: ReceiverType }): Promise<Message> {
    if (!payload.body || !payload.body.trim()) {
      throw new ApiError('Message body is required', StatusCodes.BAD_REQUEST);
    }
    if (!payload.receiver || !payload.receiverType) {
      throw new ApiError('Message receiver is required', StatusCodes.BAD_REQUEST);
    }
    if (![ReceiverType.USER, ReceiverType.GROUP].includes(payload.receiverType)) {
      throw new ApiError('Invalid receiver', StatusCodes.BAD_REQUEST);
    }

    return this.messageRepo.create({
      body: payload.body,
      receiver: payload.receiver,
      receiverType: payload.receiverType,
      sender: ctx.user._id,
      ...addCreationInfo(ctx),
      ...addModificationInfo(ctx),
    });
  }
}