import { FamilyIllustration } from '@/components/ui/family-illustration';

interface Props {
  family: string | null;
  name: string;
}

export function NoteHero({ family, name }: Props) {
  return (
    <div className="w-full aspect-square border border-border rounded-lg flex items-center justify-center bg-muted text-fg-subtle overflow-hidden p-8">
      <FamilyIllustration family={family} name={name} />
    </div>
  );
}
