import icons from './assets/apps_data/*.webp';
import rawApps from './assets/apps_data/applist.json';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry);
    if (entry.isIntersecting) {
      // if (entry.target.classList.contains('section-fade-items')) {
      //   entry.target.childNodes.forEach((child) => {
      //     child.classList && child.classList.add('animate-fade-show');
      //   });
      // }
      entry.target.classList.add('animate-fade-show');
    } else {
      // if (entry.target.classList.contains('section-fade-items')) {
      //   entry.target.childNodes.forEach((child) => {
      //     child.classList && child.classList.remove('animate-fade-show');
      //   });
      // }
      entry.target.classList.remove('animate-fade-show');
    }
  });
});

const observeElements = () =>
  $$('.section-fade,.section-fade-items').forEach((element) => {
    observer.observe(element);
  });

observeElements();

let detectedOS = navigator.userAgent.toLowerCase();
const osW = (...items) => (detectedOS == 'mac' ? items[0] : detectedOS == 'windows' ? items[1] : items[2]);
if (detectedOS.indexOf('mac') != -1) detectedOS = 'mac';
else if (detectedOS.indexOf('win') != -1) detectedOS = 'windows';
else detectedOS = 'mac';

let setupStepContents = [
  //download sideserver
  () =>
    `<b>To get started, you'll need:</b><ul class="list-disc list-inside"><li>${osW(
      'A Mac running macOS 10.15 or later',
      'A PC running Windows 10 or later',
      'A PC running Linux, of some sort'
    )}</li><li>An Apple ID</li><li>An Internet connection</li><li>An iPhone or iPad with iOS 14 or iPadOS 14 or later</li></ul><br>On your computer, download the following:<a class="btn-fill" target="_blank" href="${osW(
      'https://cdn.altstore.io/file/altstore/altserver.zip',
      'https://cdn.altstore.io/file/altstore/altinstaller.zip'
    )}">Download AltServer</a>
          <a class="btn-fill" target="_blank" href="${osW(
            'https://github.com/SideStore/SideStore/releases/latest/download/SideStore.ipa',
            'https://github.com/SideStore/SideStore/releases/latest/download/SideStore.ipa'
          )}">Download SideStore.ipa</a>
                <a class="btn-fill" target="_blank" href="${osW(
                  'https://github.com/osy/Jitterbug/releases/download/v1.3.1/jitterbugpair-macos.zip',
                  'https://github.com/osy/Jitterbug/releases/download/v1.3.1/jitterbugpair-win64.zip'
                )}">Download JitterbugPair</a>${osW(
      `Then, open the downloaded AltServer zip file and extract it. Then drag <code>AltServer.app</code> to your Applications folder. Now, open the app (you may have to right click and select "Open" if you get a warning).`,
      `Extract the downloaded AltInstaller zip file and run <code>setup.exe</code> to install AltServer. You'll  need to have the non-Microsoft Store version of iTunes and iCloud installed. Uninstall the Microsoft Store versions if you have either installed.<div class="flex flex-wrap gap-2"><a class="btn-fill" href="https://www.apple.com/itunes/download/win64/">Download iTunes</a>f</div>`
    )}`,
  //sideload app
  (os) =>
    `<b>Follow these steps to install SideStore:</b><ul class="list-disc list-inside"><li>Plug your device into your computer via a cable.</li><li>Trust your computer on your device (if prompted).</li><li>Launch Altserver and, ${osW(
      'holding options, click on the Altserver icon in the menu bar and select <code>Sideload .ipa</code>.',
      'Holding shift, click on the AltServer tray icon and select <code>Sideload .ipa</code>.'
    )}</li><li> Select the SideStore .ipa, follow instructions as prompted, and wait until AltServer confirms that SideStore has been installed.</li><li>Open <code>Settings > General > VPN & Device Management</code> on your device and approve of the <code>Developer App</code> linked to your Apple ID's email.</li><li>If your device is running iOS/iPadOS 16 or higher, you must now enable Developer Mode. To do that:<ul class="list-decimal list-inside ml-4 sm:ml-6"><li>Open the Settings app</li><li>Tap “Privacy & Security”</li><li>Scroll to the bottom and toggle Developer Mode on</li></ul></li>`,
  //Pairing Idevice
                                                                                                                                                                                                                                                        (os) =>
                                                                                                                                                                                                                                                                                                        `<b>Follow these steps to Pair your device:</b><li>Extract <code>Jitterbugpair.zip.</code> Ensure that your device is still connected to your computer via cable.</li> <ul class="list-disc list-inside"><li> ${osW(
                                                                                                                                                                                                                                                                                                          'Open your device to its homescreen. Then, execute <code>JitterBugPair</code> by double-clicking it or right-clicking it and selecting open.</li><li>JitterBugPair will then generate a <b>pairing file</b>. This pairing file will have the file exentension <code>mobiledevicepairing.</code></li>',
                                                                                                                                                                                                                                                                                                          'Open your device to its homescreen. Then, in File Explorer, locate <code>jitterbugpair.exe</code> and execute it by double-clicking it or right-clicking it and selecting open. <li>JitterBugPair will then generate a <b>pairing file</b> within the same folder. This pairing file will have the file exentension <code>mobiledevicepairing.</code> If no file generate, try running JitterBgPair as an administrator or following steps 5-7 listed <a class="glink" target="_blank" href="https://docs.SideStore.io/docs/getting-started/pairing-file.">on the docs instructions.</a></li>')}</li>
                                                                                                                                                                                                                                                                                                          
<li>Zip this pairing file and transfer it to your device via Google Drive, emailing it to yourself, or any other method.</li>
<br>In the Files app, longpress on your zipped pairing file and select uncompress. Then, locate and launch the SideStore app and select OK when prompted.<li>If you cannot find the SideStore app you may need to restart your device to make it appear.</li>Select your now unzipped pairing file and SideStore will be paired!<li>Note that if you update your iDevice your pairing file will become invalid and you'll have to go through this process again.</li><li>To get SideStore to prompt you for your pairing file again tap <code>Reset Pairing File</code> in the SideStore app.</li>`,
  //wireguard vpn
  () =>
    `On your device, download the WireGuard VPN app.<a class="btn-fill" target="_blank" href="https://apps.apple.com/us/app/wireguard/id1441195209">Download WireGuard</a>Then, download SideStore's config file and "share" it to the WireGuard app.<a class="btn-fill" target="_blank" href="https://github.com/SideStore/SideStore/releases/download/0.1.1/SideStore.conf">Download WireGuard Config</a>Enable the SideStore VPN. You'll have to enable this VPN whenever you wish to use SideStore. This VPN does not connect to an external server, but rather allows your device to communicate with itself.<br><br>If left enabled, SideStore will attempt to refresh your sideloaded apps in the background when necessary.`,
  //finished
  () =>
    `Now to finish the process: <ul class="list-disc list-inside"><li>Open SideStore and sign in with the same Apple ID you used to install SideStore.</li><li>Go to the Apps tab and refresh the SideStore app by tapping on the green day counter or selecting <code>Refresh All</code>.</li></ul><br> Now you're all set! You can use the sources menu to add installable apps to the browse tab or directly sideload any <code>.ipa</code> files on your device with the + icon in the Apps tab.<br>If you run into any issues, feel free to ask for help in our <a class="glink" target="_blank" href="https://discord.gg/RgpFBX3Q3k">Discord server.</a>`,
];

const osSelect = $('#setup-os-select');
const setupNextBtn = $('#setup-next-btn');
const setupPrevBtn = $('#setup-prev-btn');
const setupContent = $('#setup-content');
const setupStepper = [...$$('#setup-stepper li:not([aria-hidden="true"])')];
const update = (act) => {
  setupStepper.map((item, idx) => item.classList.toggle('active', idx == act));

  setupContent.classList.add('!opacity-0');
  // setupContent.classList.remove('translate-y-[40px]');
  setupContent.classList.add('translate-y-[10px]');

  setTimeout(() => {
    setupContent.innerHTML = setupStepContents[act](detectedOS);
    setupContent.classList.remove('!opacity-0');
    setupContent.classList.remove('translate-y-[10px]');
  }, 300);
  setupPrevBtn.classList.toggle('hidden', act == 0);
  setupNextBtn.classList.toggle('hidden', act == 3);
  $('#setup-btn-wrap').classList.toggle('onlyprev', act == 3);
};

setupNextBtn.addEventListener('click', () => {
  let activeStep = $('#setup-stepper li.active');
  let activeStepIndex = setupStepper.indexOf(activeStep);
  if (activeStepIndex == 3) return;
  update(activeStepIndex + 1);
});

setupPrevBtn.addEventListener('click', () => {
  let activeStep = $('#setup-stepper li.active');
  let activeStepIndex = setupStepper.indexOf(activeStep);
  if (activeStepIndex == 0) return;
  update(activeStepIndex - 1);
});
osSelect.addEventListener('change', (e) => {
  detectedOS = e.target.value;
  update(setupStepper.indexOf($('#setup-stepper li.active')));
});
osSelect.value = detectedOS;

setupStepper.map((step, index) => step.addEventListener('click', () => update(index)));
update(0);

let template = (html, obj, urlkeys) => {
  Object.keys(obj).forEach(
    (key) => (html = html.replace(new RegExp(`{{${key}}}`, 'g'), urlkeys.indexOf(key) > -1 ? new URL(obj[key], import.meta.url) : obj[key]))
  );
  return html;
};

let marqueeItem = `<div class="marquee-card"><img src="{{icon}}" alt="{{name}}" class="mr-4 h-[4.15rem] w-[4.15rem] min-h-[4.15rem] min-w-[4.15rem] rounded-[0.925rem] shadow-sm p-0.5"/><div class="flex flex-col justify-center"><h1 class="text-xl font-medium font-title text-zinc-200">{{name}}</h1><p class="whitespace-pre-line text-sm text-zinc-300/70">{{desc}}</p></div></div>`;
let eventItem = `<div class="flex items-center w-full" style="--custom-index:{{index}}"> <img class="mr-4 h-8 w-8 rounded-lg" loading="lazy" src="{{avatar}}" alt="{{actor_name}}"/> <div class="flex flex-col justify-center"> <p class="text-sm sm:text-base font-medium text-gray-300">{{message}}</p><p class="text-xs sm:text-sm text-gray-300 text-zinc-300/70">{{sub}}</p></div></div>`;
const repoItem = `<a style="--custom-index:{{index}}" href="{{url}}" target="_blank" class="flex flex-col w-full gridok:h-full max-w-md p-4 border rounded-2xl border-zinc-800 text-zinc-200 bg-material/50 hover:bg-material hover:border-zinc-700 hover:shadow-xl"> <span class="text-[1.075rem] text-semibold font-title">{{name}}</span> <p class="text-zinc-300/70 overflow-x-ellipsis whitespace-pre-wrap text-[0.9rem]">{{description}}</p><div class="gridok:flex-grow" ></div><div class="flex space-x-3 mt-1 text-[0.9rem]"> <div class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 256 256"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>{{stars}}</div><div class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 256 256"><path d="M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78.69.69,0,0,0,.13-.11L82.5,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM84,140a12,12,0,1,1,12-12A12,12,0,0,1,84,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,128,140Zm44,0a12,12,0,1,1,12-12A12,12,0,0,1,172,140Z"></path></svg>{{issues}}</div><div class="flex items-center"> <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 256 256"><path d="M104,64A32,32,0,1,0,64,95v66a32,32,0,1,0,16,0V95A32.06,32.06,0,0,0,104,64ZM88,192a16,16,0,1,1-16-16A16,16,0,0,1,88,192Zm144,0a32,32,0,1,1-40-31V123.88A39.71,39.71,0,0,0,180.28,95.6L152,67.31V96a8,8,0,0,1-16,0V48a8,8,0,0,1,8-8h48a8,8,0,0,1,0,16H163.31L191.6,84.28a55.67,55.67,0,0,1,16.4,39.6V161A32.06,32.06,0,0,1,232,192Z"></path></svg>{{forks}}</div></div></a>`;

(async () => {
  let apps = rawApps.sort(() => Math.random() - 0.5);

  apps = apps
    .map((i) => ({ ...i, icon: icons[i.name].endsWith('.webp') ? icons[i.name] : icons[i.name] + '.webp' }))
    .map((i) => template(marqueeItem, i, ['icon']));

  let set1 = apps.join('');
  let set2 = apps.reverse().join('');

  $$('#marquee1').forEach((el) => (el.innerHTML = set1));
  $$('#marquee2').forEach((el) => (el.innerHTML = set2));
  observeElements();
  // ensure gpu acceleration
  $$('.marquee-inner').forEach((e) => (e.style['transform'] = 'translateZ(0)'));

  $('#show-all-downloads').addEventListener('click', () => {
    $('#all-downloads').classList.remove('hidden');
    $('#all-downloads').classList.add('flex');
    setTimeout(() => {
      $('#all-downloads').classList.add('show');
    }, 10);
  });
  $('#close-all-downloads').addEventListener('click', () => {
    $('#all-downloads').classList.remove('show');
    setTimeout(() => {
      $('#all-downloads').classList.remove('flex');
      $('#all-downloads').classList.add('hidden');
    }, 150);
  });
  // start animation

  // $$('.marquee-inner').forEach((e) => (e.style['animation-play-state'] = 'running'));

  console.log(`Loaded apps marquee with ${apps.length} items.`);

  let cache_log = JSON.parse(localStorage.getItem('eventLogCache')) || [];
  let eventLog = [];
  //less than 5 minutes old
  if (cache_log.length && localStorage.getItem('eventLogCacheDate') < Date.now() - 1000 * 60 * 5) eventLog = cache_log;
  if (process.env.NODE_ENV !== 'production') {
    eventLog = await import('./assets/mockevents.json');
  } else {
    if (!eventLog.length) {
      eventLog = await (await fetch('https://api.github.com/orgs/SideStore/events?per_page=100')).json();
      localStorage.setItem('eventLogCache', JSON.stringify(eventLog));
    }
  }

  const cache_repos = JSON.parse(localStorage.getItem('reposCache')) || [];
  let repos = [];
  if (cache_repos.length && localStorage.getItem('reposCacheDate') < Date.now() - 1000 * 60 * 60 * 4) repos = cache_repos;
  if (process.env.NODE_ENV !== 'production') {
    repos = await import('./assets/mockrepos.json');
  } else {
    if (!repos.length) {
      repos = await (await fetch('https://api.github.com/users/SideStore/repos?per_page=50')).json();
      localStorage.setItem('reposCache', JSON.stringify(repos));
    }
  }

  // $$('[linked-dropdown]').forEach((el) => {
  //   const linkedDropdown = document.getElementById(el.getAttribute('linked-dropdown'));
  //   const dropdownHidden = linkedDropdown.getAttribute('dropdown-hidden').split(' ') || [];
  //   const dropdownVisible = linkedDropdown.getAttribute('dropdown-visible').split(' ') || [];
  //   const copyWidth = linkedDropdown.getAttribute('dd-copy-width') ? $(linkedDropdown.getAttribute('dd-copy-width')) : false;
  //   console.log(`Linked dropdown button to ${`#` + linkedDropdown.id || `.` + el.class}.`);
  //   const hide = () => {
  //     linkedDropdown.classList.remove('dd-visible');
  //     dropdownHidden.forEach((i) => linkedDropdown.classList.add(i));
  //     dropdownVisible.forEach((i) => linkedDropdown.classList.remove(i));
  //   };
  //   hide();
  //   el.addEventListener('click', () => {
  //     // if the linked dropdown has the class dd-visibile, then remove visible tags and add hidden tags
  //     if (linkedDropdown.classList.contains('dd-visible')) hide();
  //     else {
  //       linkedDropdown.classList.add('dd-visible');
  //       if (copyWidth) linkedDropdown.style.width = copyWidth.offsetWidth + 'px';
  //       dropdownHidden.forEach((i) => linkedDropdown.classList.remove(i));
  //       dropdownVisible.forEach((i) => linkedDropdown.classList.add(i));
  //       //scroll to top of dropdown
  //       // linkedDropdown.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   });
  // });

  const builtRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .filter((i) => i.id != 563241929) // SideStore_downloader
    .slice(0, 9)
    .map((i, index) => {
      let descP = (i.description.length > 85 ? i.description.split('.')[0].split('and')[0] : i.description).trim();
      descP.endsWith('.') || descP.endsWith(',') ? (descP = descP.slice(0, -1)) : null;
      return template(
        repoItem,
        {
          name: i.name.replace(/_/g, '-'),
          description: descP,
          stars: i.stargazers_count,
          forks: i.forks_count,
          issues: i.open_issues_count,
          url: i.html_url,
          index,
        },
        []
      );
    })
    .join('');

  $('#repos-grid').innerHTML = builtRepos;
  observeElements();
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
    .map((i, index) => {
      let url = (t) => t.replace(/https:\/\/api\.github\.com\/(users|repos)/i, 'https://github.com');
      let glink = (id, type) => `<a class="glink" target="_blank" href="${`${url(i.data.repo.url)}/${type}/${id}`}">#${id}</a>`;

      let text = `<a class="glink" href="${url(i.data.actor.url)}">${i.data.actor.login}</a> `;
      if (i.event == 'commit') text += `pushed ${i.data.commits} commit${i.data.commits > 1 ? 's' : ''}`;
      if (i.event == 'issue_comment') text += `commented on issue ${glink(i.data.issueID, 'issues')}`;
      if (i.event == 'pull_comment') text += `commented on pull request ${glink(i.data.pullID, 'pull')}`;
      if (i.event == 'pull_request') text += ` ${i.data.action} pull request ${glink(i.data.pullID, 'pull')}`;

      let sub = `in <a class="glink" href="${url(i.data.repo.url)}">${i.data.repo.name.split('/')[1]}</a> • ${i.data.date.dateSpan}`;
      return template(eventItem, { avatar: i.data.actor.avatar_url + 'v=3&s=32', message: text, sub, actor_name: i.data.actor.login, index }, []);
    })
    .slice(0, 9);

  $$('#event-log').forEach((el) => (el.innerHTML = log.join('')));
  observeElements();

  // for every button with id "hookPlatformDL"
  // $$('#hookPlatformDL').forEach((el) => {
  //   const ddList = $(el.getAttribute('platform-dl-list'));
  //   const platformDLElement = ddList.querySelector(`[dl-platform=${os}]`);
  //   const platformText = el.querySelector('#platformText');
  //   console.log(platformDLElement);
  //   if (platformText) platformText.innerText = `for ${platformDLElement.innerText}`;

  //   if (platformDLElement.classList.contains('disabled') || platformDLElement.hasAttribute('disabled')) return el.classList.add('disabled');
  //   el.href = platformDLElement.href;
  // });

  // const releaseData = await (await fetch('https://api.github.com/repos/SideStore/SideStore/releases/latest')).json();
  // const versionTag = releaseData.tag_name || '?.?.?';
  // const label = $('#hook-latest-ipa-version');
  // label.innerText = `v${versionTag}`;
})();
