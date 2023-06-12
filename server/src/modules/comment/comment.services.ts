import { NextFunction, Request } from "express";
import AppError from "../../utils/appError";
import { FORBIDDEN } from "../../constants/response-codes";

import CommentNews from "../../models/CommentNews";
import CommentProject from "../../models/CommentProject";
import News from  "../../models/News";
import Project from  "../../models/Project";
import Reply from "../../models/Reply";
import { getPagination, getPagingData } from "../../helpers/Pagination";


export const comment_news = async  (next: NextFunction, req: Request) => {
    
    //@ts-ignore
    const news = await News.findOne({where: {id: req.params.id}});

    if(!news) {
        return console.log("News does not exist", FORBIDDEN);
    }
    const new_comment  = await CommentNews.create({
        ...req.body,
        newsId: req.params.id
    })

    await news?.$add('comments', [new_comment]);
    return new_comment;
};
export const comment_project = async (next: NextFunction, req: Request) => {
    
    const project = await Project.findOne({where: {id: req.params.id}});

    if(!project) {
        return console.log("Project does not exist", FORBIDDEN);
    }

    const new_comment  = await CommentProject.create({
        ...req.body,
        projectId: req.params.id
    })

    await project?.$add('comments', [new_comment]);
    return new_comment;
}

export const comment_news_like = async  (req: Request)  => {

    const { like, commentId } = req.body;

    const news = await News.findOne({where: {id: req.params.id}});

    if(!news) {
        return console.log("News does not exist", FORBIDDEN);
    };

    const _commentId = parseInt(commentId)

    const comment = await news.$get('comments');
    const targetComment = comment.find((comment: any) =>  comment.id === _commentId)
    if (!targetComment) {
        return console.log("Comment does not exist");
    }

    await targetComment.update({ like: +targetComment.like + like });
    
};
export const comment_project_like = async  (req: Request)  => {

    const { like, commentId } = req.body;

    const project = await Project.findOne({where: {id: req.params.id}});

    if(!project) {
        return console.log("Project does not exist", FORBIDDEN);
    };
    const _commentId = parseInt(commentId)
    const comment = await project.$get('comments');
    const targetComment = comment.find((comment: any) =>  comment.id === _commentId)
    if (!targetComment) {
        return console.log("Comment does not exist");
    }
    
    await targetComment.update({ like: +targetComment.like + like });
    
};

export const comment_news_dislike = async (req: Request) => {

    const { dislike, commentId } = req.body;

    const news = await News.findOne({ where: { id: req.params.id } });
    if (!news) {
    return console.log("News does not exist", FORBIDDEN);
    }
    const _commentId = parseInt(commentId)
    const comment = await news.$get("comments");
    const targetComment = comment.find((comment: any) => comment.id === _commentId);
    if (!targetComment) {
        return console.log("Comment does not exist");
    }

    await targetComment.update({ dislike: +targetComment.dislike + dislike });

};
export const comment_project_dislike = async  (req: Request)  => {

    const { dislike, commentId } = req.body;

    const project = await Project.findOne({where: {id: req.params.id}});

    if(!project) {
        return console.log("Project does not exist", FORBIDDEN);
    };
    const _commentId = parseInt(commentId)
    const comment = await project.$get('comments');
    const targetComment = comment.find((comment: any) =>  comment.id === _commentId)
    if (!targetComment) {
        return console.log("Comment does not exist");
    }

    await targetComment.update({ dislike: +targetComment.dislike + dislike });
    
};

export const delete_comment_news = async (req: Request) => {

    const comment = await CommentNews.findOne({
        where: { id: req.params.id }
    });
    if(!comment){
        console.log('Comment not here');
    };

    await CommentNews.destroy({ where: { id: req.params.id } });
      
}
export const delete_comment_project = async (req: Request) => {

    const comment = await CommentProject.findOne({
        where: { id: req.params.id }
    });
    if(!comment){
        console.log('Comment not here');
    };

    await CommentProject.destroy({ where: { id: req.params.id } });
      
}

export const reply_comment_news =  async (req: Request)=> {

    const { commentId } = req.body;
    const news = await News.findOne({where: {id: req.params.id}});
    if(!news){
        return console.log("News does not exist", FORBIDDEN)
    }

    const _commentId = parseInt(commentId)
    const comment = await news?.$get('comments');
    const targetComment  = comment.find((comment: any) => comment.id === _commentId);

    if (!targetComment) {
        return console.log("Comment does not exist");
      }
    
    const _reply  = await Reply.create({
        ...req.body,
        commentNewsId: _commentId
    })

    await targetComment?.$add('replies', [_reply])
    return _reply;
};
export const reply_comment_project = async (req: Request) => {
    const { commentId } = req.body;
  
    const project = await Project.findOne({ where: { id: req.params.id } });
    if (!project) {
      return console.log("Project does not exist", FORBIDDEN);
    }
    const _commentId = parseInt(commentId)
    const comment = await project?.$get("comments");
    const targetComment = comment.find((comment: any) => comment.id === _commentId);
  
    if (!targetComment) {
      return console.log("Comment does not exist");
    }
  
    const _reply = await Reply.create({
      ...req.body,
      commentProjectId: _commentId,
    });
  
    await targetComment.$add("replies", [_reply]);
  
    return _reply;
};

export const reply_news_like = async (req: Request) => {
    const { like, commentId, replyId } = req.body;

    const targetReply = await Reply.findOne({
    where: { id: replyId, commentNewsId: commentId }
    });

    if (!targetReply) {
    return console.log("Reply does not exist");
    }

    await targetReply.update({ like: +targetReply.like + like });
};
export const reply_project_like = async (req: Request) => {
    const { like, commentId, replyId } = req.body;

    const targetReply = await Reply.findOne({
    where: { id: replyId, commentProjectId: commentId }
    });

    if (!targetReply) {
    return console.log("Reply does not exist");
    }

    await targetReply.update({ like: +targetReply.like + like });
};

export const reply_news_dislike = async (req: Request) => {
    const { dislike, commentId, replyId } = req.body;

    const targetReply = await Reply.findOne({
    where: { id: replyId, commentNewsId: commentId }
    });

    if (!targetReply) {
    return console.log("Reply does not exist");
    }

    await targetReply.update({ dislike: +targetReply.dislike + dislike });
};
export const reply_project_dislike = async (req: Request) => {
    const { dislike, commentId, replyId } = req.body;

    const targetReply = await Reply.findOne({
    where: { id: replyId, commentProjectId: commentId }
    });

    if (!targetReply) {
    return console.log("Reply does not exist");
    }

    await targetReply.update({ dislike: +targetReply.dislike + dislike });
};

export const fetch_comment_news = async (req: Request) => {
     
    const pageAsNumber = Number.parseInt(req.query.page as string);
    const sizeAsNumber = Number.parseInt(req.query.size as string);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber
    }
  
    let size = 0;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber === 3) {
      size = sizeAsNumber
    }
  
    const { limit, offset } = getPagination(page, size);

    const comments = await CommentNews.findAndCountAll({
        limit,
        offset,
        where: { newsId: req.params.id },
        include: [Reply],
        order: [['createdAt', 'DESC']]
     });

     const response = getPagingData(comments, page, limit)
     return response;
};
export const fetch_comment_project = async (req: Request) => {
    
    const pageAsNumber = Number.parseInt(req.query.page as string);
    const sizeAsNumber = Number.parseInt(req.query.size as string);
  
    let page = 0;
    if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
      page = pageAsNumber
    }
  
    let size = 0;
    if(!Number.isNaN(sizeAsNumber) && sizeAsNumber === 3) {
      size = sizeAsNumber
    }
  
    const { limit, offset } = getPagination(page, size);

    const comments = await CommentProject.findAndCountAll({
        limit,
        offset,
        order: [['createdAt', 'DESC']],
        where: { projectId: req.params.id },
        include: [Reply]
    });

    const response = getPagingData(comments, page, limit)
    return response;
};

  
  