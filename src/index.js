import icons from './assets/app_icons/*.webp';

let template = (html, obj, urlkeys) => {
  Object.keys(obj).forEach(
    (key) => (html = html.replace(new RegExp(`{{${key}}}`, 'g'), urlkeys.indexOf(key) > -1 ? new URL(obj[key], import.meta.url) : obj[key]))
  );
  return html;
};

let marqueeItem = `<div class="mx-2 flex h-auto w-max max-w-[324px] items-center rounded-xl bg-[rgba(31,32,35,.5)] px-4 py-4"><img src="{{icon}}" alt="{{name}}" class="mr-4 h-16 w-16 rounded-xl" /><div class="flex flex-col justify-center"><h1 class="text-xl font-medium font-['Poppins'] text-gray-200">{{name}}</h1><p class="whitespace-pre-line text-sm text-gray-200">{{desc}}</p></div></div>`;
let eventItem = `<li class="flex items-center mb-1.5"><img class="mr-2 h-5 w-5 rounded-full" loading="lazy" src="{{avatar}}" alt="{{actor_name}}"/><p class="font-mono text-xs text-gray-300">{{message}}</p></li>`;

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
    desc: 'Ready is an open source emulator for multiple 8 bit home computers.',
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
];
window.apps = apps;
(async () => {
  apps = apps
    .map((i) => ({ ...i, icon: icons[i.name].endsWith('.webp') ? icons[i.name] : icons[i.name] + '.webp' }))
    .map((i) => template(marqueeItem, i, ['icon']));

  let set1 = apps.sort(() => Math.random() - 0.5).join('');
  let set2 = apps.sort(() => Math.random() - 0.5).join('');
  document.querySelectorAll('#marquee1').forEach((el) => (el.innerHTML = set1.repeat(2)));
  document.querySelectorAll('#marquee2').forEach((el) => (el.innerHTML = set2.repeat(2)));
  document.querySelectorAll('.marquee-inner').forEach((e) => (e.style['animation-play-state'] = 'running'));

  console.log(`Loaded apps marquee with ${apps.length} items.`);

  let eventLog = [];
  if (process.env.NODE_ENV !== 'production') {
    eventLog = await import('./assets/mockevents.json');
  } else {
    eventLog = await (await fetch('https://api.github.com/orgs/sidestore/events?per_page=50')).json();
  }

  const typeMap = {
    PushEvent: 'commit',
    IssueCommentEvent: 'issue_comment',
    PullRequestReviewCommentEvent: 'pull_comment',
    PullRequestEvent: 'pull_request',
  };

  let log = eventLog
    .filter((i) => Object.keys(typeMap).includes(i.type))
    .filter((i) => !i.actor.login.includes('[bot]'))
    .filter((i) => i.type !== 'PullRequestEvent' || ['opened', 'closed', 'reopened'].includes(i.payload.action))
    .map((i) => ({
      event: typeMap[i.type],
      data: {
        commits: (i.payload.commits && i.payload.commits.length) || null,
        issueID: (i.payload.issue && i.payload.issue.number) || null,
        pullID: (i.payload.pull_request && i.payload.pull_request.number) || null,
        action: i.payload.action || null,
        date: {
          firstDate: i.created_at,
          lastDate: i.created_at,
          dateSpan: null,
        },
        actor: i.actor,
        repo: i.repo,
      },
    }))
    .reduce((acc, i) => {
      if (i.event == 'commit') {
        let last = acc[acc.length - 1];

        if (last && last.event == 'commit' && last.data.actor.login == i.data.actor.login && last.data.repo.name == i.data.repo.name) {
          last.data.commits += i.data.commits;
          last.data.date.lastDate = i.data.date.firstDate;
          return acc;
        }
      }
      acc.push(i);
      return acc;
    }, [])
    .map((i) => {
      const set = (t) => (i.data.date.dateSpan = t);
      let lastDate = new Date(i.data.date.lastDate);
      let dateSpan = Math.round((new Date() - lastDate) / 1000 / 60);

      if (dateSpan == 0) set('just now');
      else if (dateSpan == 1) set('a minute ago');
      else if (dateSpan <= 60) set(`${dateSpan} minutes ago`);
      else if (dateSpan / 60 == 1) set('an hour ago');
      else if (dateSpan / 60 <= 24) set(`${Math.round(dateSpan / 60)} hours ago`);
      else if (dateSpan / 60 <= 48) set('yesterday');
      else if (dateSpan / 60 <= 24 * 365) set(`${Math.round(dateSpan / 60 / 24)} days ago`);
      else set(`a long time ago`);

      return i;
    })
    .map((i) => {
      let url = (t) => t.replace(/https:\/\/api\.github\.com\/(users|repos)/i, 'https://github.com');
      let glink = (id, type) => `<a class="glink" target="_blank" href="${`${url(i.data.repo.url)}/${type}/${id}`}">#${id}</a>`;

      let text = `<a class="glink" href="${url(i.data.actor.url)}">${i.data.actor.login}</a> `;
      if (i.event == 'commit') text += `pushed ${i.data.commits} commit${i.data.commits > 1 ? 's' : ''} to `;
      if (i.event == 'issue_comment') text += `commented on issue ${glink(i.data.issueID, 'issues')} in `;
      if (i.event == 'pull_comment') text += `commented on pull request ${glink(i.data.pullID, 'pull')} in `;
      if (i.event == 'pull_request') text += ` ${i.data.action} pull request ${glink(i.data.pullID, 'pull')} in `;

      text += `<a class="glink" href="${url(i.data.repo.url)}">${i.data.repo.name.split('/')[1]}</a> ${i.data.date.dateSpan}`;
      return template(eventItem, { avatar: i.data.actor.avatar_url + 'v=3&s=32', message: text, actor_name: i.data.actor.login }, []);
    })
    .slice(0, 15);

  document.querySelectorAll('#event-log').forEach((el) => (el.innerHTML = log.join('')));
})();
