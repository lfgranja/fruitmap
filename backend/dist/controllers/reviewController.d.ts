import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
declare const _default: {
    createReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getReviewsForTree: (req: Request, res: Response) => Promise<void>;
    updateReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteReview: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getReviewStats: (req: Request, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=reviewController.d.ts.map