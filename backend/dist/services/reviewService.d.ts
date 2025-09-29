interface ReviewData {
    treeId: string;
    userId: string;
    rating: number;
    comment?: string;
}
declare class ReviewService {
    createReview(data: ReviewData): Promise<any>;
    getReviewsForTree(treeId: string, limit?: number, offset?: number): Promise<{
        reviews: any[];
        count: number;
    }>;
    updateReview(reviewId: string, userId: string, data: Partial<ReviewData>): Promise<any>;
    deleteReview(reviewId: string, userId: string): Promise<void>;
    getAverageRating(treeId: string): Promise<number>;
    getReviewCount(treeId: string): Promise<number>;
}
declare const _default: ReviewService;
export default _default;
//# sourceMappingURL=reviewService.d.ts.map