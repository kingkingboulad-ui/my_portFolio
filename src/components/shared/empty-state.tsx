import { FolderOpen } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
}

export default function EmptyState({ title = 'لا توجد بيانات', description = 'لم يتم العثور على أي عناصر' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-2xl bg-amber-500/10 mb-4">
        <FolderOpen className="w-10 h-10 text-amber-400" />
      </div>
      <h3 className="text-lg font-bold text-t1 mb-2">{title}</h3>
      <p className="text-t3 text-sm">{description}</p>
    </div>
  );
}
