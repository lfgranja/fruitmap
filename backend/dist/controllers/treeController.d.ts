import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
declare const _default: {
    getAllTrees: (req: Request, res: Response) => Promise<void>;
    getTreeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createTree: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateTree: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteTree: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    searchTrees: (req: Request, res: Response) => Promise<void>;
    getTreesBySpecies: (req: Request, res: Response) => Promise<void>;
};
export default _default;
//# sourceMappingURL=treeController.d.ts.map