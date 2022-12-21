import icons from './assets/app_icons/*.webp';

let template = (html, obj, urlkeys) => {
  Object.keys(obj).forEach(
    (key) => (html = html.replace(new RegExp(`{{${key}}}`, 'g'), urlkeys.indexOf(key) > -1 ? new URL(obj[key], import.meta.url) : obj[key]))
  );
  return html;
};

let marqueeItem = `<div class="mx-2 flex h-auto w-max max-w-[324px] items-center rounded-xl bg-[rgba(31,32,35,.5)] px-4 py-4">
    <img src="{{icon}}" alt="{{name}}" class="mr-4 h-16 w-16 rounded-xl" />
    <div class="flex flex-col justify-center">
    <h1 class="text-xl font-medium font-['Poppins'] text-gray-200">{{name}}</h1>
    <p class="whitespace-pre-line text-sm text-gray-200">{{desc}}</p>
    </div>
    </div>
    `;

let apps = [
  { name: 'UTM', desc: 'Run virtual machines on iOS' },
  {
    name: 'Provenance',
    desc: 'Multi-emulator frontend, supporting various Atari, Bandai, NEC, Nintendo, Sega, SNK and Sony console systems…',
  },
  { name: 'PojavLauncher', desc: 'A Minecraft: Java Edition Launcher' },
  { name: 'Flycast', desc: 'A Dreamcast, Naomi, Naomi 2 and Atomiswave emulator.' },
  { name: 'DolphiniOS', desc: 'A port of the popular Dolphin emulator to iOS.' },
  {
    name: 'PokeMMO',
    desc: 'PokeMMO is a free to play mmorpg, come join a growing community as you level up and discover new monsters.',
  },
  { name: 'Delta', desc: 'Classic games in your pocket.' },
  { name: 'Clip', desc: 'Manage your clipboard history with ease.' },
  {
    name: 'PPSSPP',
    desc: 'PPSSPP can run your PSP games on your iPhone and iPad in full HD resolution.',
  },
  {
    name: 'RetroArch',
    desc: 'RetroArch is a frontend for a plethora of emulators.',
  },
  {
    name: 'iNDS',
    desc: 'Aa derivation of the previous Nintendo DS emulator apps for iOS: nds4ios and Nitrogen.',
  },
  {
    name: 'Play!',
    desc: 'Play! is a portable PlayStation2 emulator.',
  },
  {
    name: 'iDOS',
    desc: 'Play classic DOS games on your iPhone and iPad!',
  },
  {
    name: 'Firebird Emu',
    desc: 'Third-party multi-platform emulator of the ARM-based TI-Nspire calculators.',
  },
  {
    name: 'ActiveGS iOS',
    desc: 'An emulator for all things Apple.',
  },
  {
    name: 'Ready',
    desc: 'Ready is an open source emulator for the following 8 bit home computers:',
  },
  {
    name: 'MAME4iOS',
    desc: 'Play arcade games from the past 30+ years.',
  },
  {
    name: 'OldOS',
    desc: 'OldOS is a testament to the days of yesteryear, showcasing what iOS once was ten years ago.',
  },
  {
    name: 'iTorrent',
    desc: 'iTorrent is an ordinary torrent client for iOS with Files app support.',
  },
  {
    name: 'Rewound',
    desc: 'Rewound uses your Apple Music library and displays it in the nostalgic style of an old spin-wheel iPod.',
  },
  {
    name: 'ScummVM',
    desc: 'Run certain classic graphical point-and-click adventure games and role-playing games.',
  },
  {
    name: 'Mini vMac',
    desc: 'Fully emulates the Mac Plus, the Mac II or the Mac 128K',
  },
]
  .map((i) => ({ ...i, icon: icons[i.name].endsWith('.webp') ? icons[i.name] : icons[i.name] + '.webp' }))
  .map((i) => template(marqueeItem, i, ['icon']));

let set1 = apps.sort(() => Math.random() - 0.5).join('');
let set2 = apps.sort(() => Math.random() - 0.5).join('');
document.querySelectorAll('#marquee1').forEach((el) => (el.innerHTML = set1));
document.querySelectorAll('#marquee2').forEach((el) => (el.innerHTML = set2));

console.log(`Loaded apps marquee with ${apps.length} items.`);
