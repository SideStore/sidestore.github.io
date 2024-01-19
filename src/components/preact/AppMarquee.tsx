import rawApps from '../../applist.json';
import MarqueeItem from '../preact/MarqueeItem';


export default function AppMarquee() {
  let apps = rawApps.sort(() => Math.random() - 0.5);
  
  let rows = apps
    .map((i) => ({ ...i, icon: i.filepath.endsWith('.webp') ? i.filepath : i.filepath + '.webp' }))
    .map((i) => (MarqueeItem(i)))
  
  let set1 = rows;
  let set2 = rows.reverse();
  return (
    <div className="mask-fade-vertical marquee-wrapper section-fade section-fade-less mt-4 flex w-full flex-col">
      <div className="marquee-container relative flex overflow-x-hidden">
        <div className="marquee-inner relative flex w-fit whitespace-nowrap py-2" id="marquee1">
          {set1}
        </div>
      </div>
      <div className="marquee-container relative flex overflow-x-hidden">
        <div className="marquee-inner marquee-reverse relative flex w-fit whitespace-nowrap py-2" id="marquee2">
          {set2}
        </div>
      </div>
    </div>
  );
}
