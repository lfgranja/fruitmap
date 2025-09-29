interface Point {
    lat: number;
    lng: number;
}
interface BoundingBox {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
}
declare class GeospatialService {
    findTreesInBounds(boundingBox: BoundingBox): Promise<any[]>;
    findTreesNearPoint(center: Point, radiusKm: number): Promise<any[]>;
    private calculateDistance;
    getTreesBySpecies(speciesId: number, boundingBox?: BoundingBox): Promise<any[]>;
}
declare const _default: GeospatialService;
export default _default;
//# sourceMappingURL=geospatialService.d.ts.map