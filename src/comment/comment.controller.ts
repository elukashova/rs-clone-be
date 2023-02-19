import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { User, UserTokenInfo } from 'src/auth/decorators/auth.decorator';
import {
  CommentService,
  CreateCommentParams,
  UpdateCommentParams,
} from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly activityService: CommentService) {}

  @Post()
  createComment(
    @User() user: UserTokenInfo,
    @Body() body: CreateCommentParams,
  ) {
    return this.activityService.createComment(user.id, body);
  }

  @Put(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCommentParams,
  ) {
    return this.activityService.updateComment(id, body);
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    return this.activityService.deleteComment(id);
  }
}
