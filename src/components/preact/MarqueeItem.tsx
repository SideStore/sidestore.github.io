class MarqueeItemProps {
  name: string = '';
  desc: string = '';
  filepath: string = '';
}

export default function MarqueeItem(props: MarqueeItemProps) {
  return (
    <div class="marquee-card">
      <img src={props.filepath.substring(7)} alt={props.name} class="mr-4 h-[4.15rem] min-h-[4.15rem] w-[4.15rem] min-w-[4.15rem] rounded-[0.925rem] p-0.5 shadow-sm" />
      <div class="flex flex-col justify-center">
        <h1 class="font-title text-xl font-medium text-zinc-200">{props.name}</h1>
        <p class="whitespace-pre-line text-sm text-zinc-300/70">{props.desc}</p>
      </div>
    </div>
  );
}
