import { Skeleton } from "./Skeleton";

function BaseSkeleton() {
  return (
    <div className="p-6 space-y-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm min-h-[70vh]">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    </div>
  );
}

export const HomeSkeleton = BaseSkeleton;
export const ExploreSkeleton = BaseSkeleton;
export const ReportSkeleton = BaseSkeleton;
export const SavedSkeleton = BaseSkeleton;
export const ProfileSkeleton = BaseSkeleton;
export const CulturalSkeleton = BaseSkeleton;
