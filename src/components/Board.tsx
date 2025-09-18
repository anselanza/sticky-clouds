import RenderedSticky from './RenderedSticky';

interface Props {
  stickies: Array<Sticky>;
}

export default function Board({ stickies }: Props) {
  return (
    <div>
      <h2>Have {stickies.length} stickies</h2>

      {stickies.map((s) => (
        <RenderedSticky key={`sticky-${s.id}`} {...s} />
      ))}
    </div>
  );
}
