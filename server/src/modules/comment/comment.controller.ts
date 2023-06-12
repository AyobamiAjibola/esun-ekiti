import { NextFunction, Request, Response } from "express";
import { BAD_REQUEST, OK, RESOURCE_CREATED } from "../../constants/response-codes";
import AppError from "../../utils/appError";
import * as commentServices from "./comment.services";
import * as commentValidator from "./comment.validator";


export const new_comment_news = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const validate = commentValidator.postCommentNews(req.body);
        if(validate.error) {
            return next(new AppError(validate.error.message, BAD_REQUEST));
        }

        const comment = await commentServices.comment_news(next, req);

        res.status(RESOURCE_CREATED).json({
            status:  !comment ? 'failed' :  'success',
            message: !comment ? "Unsuccessful" : "Comment created successfully",
            data: { comment }
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
};
export const new_comment_project = async (req: Request, res: Response, next: NextFunction) =>  {
    try {
        const validate = commentValidator.postCommentProject(req.body);
        if(validate.error) {
            return next(new AppError(validate.error.message, BAD_REQUEST));
        }

        const comment = await commentServices.comment_project(next, req);

        res.status(RESOURCE_CREATED).json({
            status:  !comment ? 'failed' :  'success',
            message: !comment ? "Unsuccessful" : "Comment created successfully",
            data: { comment }
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
};

export const comment_news_like = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.comment_news_like(req);

        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Liked",
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
    
};
export const comment_project_like = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        await commentServices.comment_project_like(req);

        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Liked",
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
    
}

export const comment_news_dislike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.comment_news_dislike(req);

        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Disliked",
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
    
};
export const comment_project_dislike = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        await commentServices.comment_project_dislike(req);

        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Disliked",
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
    
};

export const delete_comment_news = async (req: Request, res:  Response, next: NextFunction) => {
    try {
        await  commentServices.delete_comment_news(req);
        res.status(OK).json({
            status: "success",
            message:  "Comment deleted Successfully",
            // data: null
        })
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
};
export const delete_comment_project = async (req: Request, res:  Response, next: NextFunction) => {
    try {
        await commentServices.delete_comment_project(req);
        res.status(OK).json({
            status: "success",
            message:  "Comment deleted Successfully",
            // data: null
        })
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST));
    }
};

export  const reply_comment_news = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reply =  await commentServices.reply_comment_news(req);
        res.status(RESOURCE_CREATED).json({
            status:  !reply ? 'failed' :  'success',
            message: !reply ? "Unsuccessful" : "Reply created successfully",
            data: { reply }
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};
export  const reply_comment_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reply =  await commentServices.reply_comment_project(req);
        res.status(RESOURCE_CREATED).json({
            status:  !reply ? 'failed' :  'success',
            message: !reply ? "Unsuccessful" : "Reply created successfully",
            data: { reply }
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};

export const reply_news_like = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.reply_news_like(req);
        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Liked"
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};
export const reply_project_like = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.reply_project_like(req);
        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Liked"
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};

export const reply_news_dislike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.reply_news_dislike(req);
        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Disliked"
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};
export const reply_project_dislike = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await commentServices.reply_project_dislike(req);
        res.status(RESOURCE_CREATED).json({
            status:  'success',
            message: "Disliked"
        });

    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
};

export const fetch_comment_news = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await commentServices.fetch_comment_news(req);

        res.status(200).json({
            status:  !comments ? 'failed' : 'success',
            message: !comments ? "No Comments Available" : "Fetched Comments successfully",
            data: { comments }
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
    
};
export const fetch_comment_project = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const comments = await commentServices.fetch_comment_project(req);

        res.status(200).json({
            status:  !comments ? 'failed' : 'success',
            message: !comments ? "No Comments Available" : "Fetched Comments successfully",
            data: { comments }
        });
    } catch (error: any) {
        return next(new AppError(error.message, BAD_REQUEST))
    }
    
};
