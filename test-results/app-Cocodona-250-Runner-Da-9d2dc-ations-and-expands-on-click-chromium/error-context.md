# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Cocodona 250 Runner Dashboard >> Aid Stations tab shows stations and expands on click
- Location: tests/e2e/app.spec.js:43:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button').filter({ hasText: /mi \d/ }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button').filter({ hasText: /mi \d/ }).first()

```

# Page snapshot

```yaml
- generic [ref=e4]:
  - generic [ref=e5]:
    - generic [ref=e6]:
      - generic [ref=e7]:
        - generic [ref=e8]: Aravaipa Running · Arizona · May 2026
        - heading "Cocodona 250" [level=1] [ref=e9]
        - paragraph [ref=e10]: Black Canyon City → Flagstaff · 252.9 miles · 40,667' gain
      - generic [ref=e11]:
        - generic [ref=e12]:
          - generic [ref=e13]: 125h
          - generic [ref=e14]: Cutoff
        - generic [ref=e15]:
          - generic [ref=e16]: "27"
          - generic [ref=e17]: Aid Stations
    - generic [ref=e18]:
      - text: START
      - text: FINISH
    - generic [ref=e20]: Mi 0 · Deep Canyon RanchMi 252.9 · Heritage Square
  - generic [ref=e21]:
    - button "Map" [ref=e22]
    - button "Aid Stations" [active] [ref=e23]
    - button "Race Summary" [ref=e24]
    - button "Schedule" [ref=e25]
    - button "Required Gear" [ref=e26]
    - button "Key Rules" [ref=e27]
    - button "Course Info" [ref=e28]
    - button "Pacing" [ref=e29]
  - generic [ref=e31]:
    - generic [ref=e32]:
      - textbox "Search aid stations\\u2026" [ref=e33]
      - button "All" [ref=e34] [cursor=pointer]
      - button "Crew" [ref=e35] [cursor=pointer]
      - button "Pacer" [ref=e36] [cursor=pointer]
      - button "Drop Bags" [ref=e37] [cursor=pointer]
      - button "Sleep" [ref=e38] [cursor=pointer]
      - button "Medic" [ref=e39] [cursor=pointer]
    - generic [ref=e40]:
      - generic [ref=e41]:
        - img [ref=e43]
        - generic [ref=e48]: Crew
      - generic [ref=e49]:
        - img [ref=e51]
        - generic [ref=e54]: Pacer
      - generic [ref=e55]:
        - img [ref=e57]
        - generic [ref=e60]: Drop Bag
      - generic [ref=e61]:
        - img [ref=e63]
        - generic [ref=e65]: Sleep (Indoor)
      - generic [ref=e66]:
        - img [ref=e68]
        - generic [ref=e70]: Sleep (Outdoor)
      - generic [ref=e71]:
        - img [ref=e73]
        - generic [ref=e75]: Shower
      - generic [ref=e76]:
        - img [ref=e78]
        - generic [ref=e80]: Medic
    - generic [ref=e81]:
      - button "START Start Line – Deep Canyon Ranch 5:00 AM start cutoff Mon 5:00 AM" [ref=e83] [cursor=pointer]:
        - generic [ref=e84]:
          - generic [ref=e85]: START
          - generic [ref=e86]:
            - generic [ref=e87]: Start Line – Deep Canyon Ranch
            - generic [ref=e88]: 5:00 AM start
          - generic [ref=e89]:
            - generic [ref=e90]:
              - img [ref=e92]
              - img [ref=e98]
            - generic [ref=e102]: cutoff Mon 5:00 AM
          - img [ref=e104]
      - button "7.4 Cottonwood Creek no target set cutoff Mon 9:50 AM" [ref=e107] [cursor=pointer]:
        - generic [ref=e109]:
          - generic [ref=e110]: "7.4"
          - generic [ref=e111]:
            - generic [ref=e112]: Cottonwood Creek
            - generic [ref=e113]: no target set
          - generic [ref=e116]: cutoff Mon 9:50 AM
          - img [ref=e118]
      - button "10.4 Water Station no target set no cutoff" [ref=e121] [cursor=pointer]:
        - generic [ref=e123]:
          - generic [ref=e124]: "10.4"
          - generic [ref=e125]:
            - generic [ref=e126]: Water Station
            - generic [ref=e127]: no target set
          - generic [ref=e129]: no cutoff
          - img [ref=e131]
      - button "24.6 Water Station no target set no cutoff" [ref=e134] [cursor=pointer]:
        - generic [ref=e136]:
          - generic [ref=e137]: "24.6"
          - generic [ref=e138]:
            - generic [ref=e139]: Water Station
            - generic [ref=e140]: no target set
          - generic [ref=e142]: no cutoff
          - img [ref=e144]
      - button "32.5 Lane Mtn by UltrAspire no target set cutoff Mon 10:45 PM" [ref=e147] [cursor=pointer]:
        - generic [ref=e149]:
          - generic [ref=e150]: "32.5"
          - generic [ref=e151]:
            - generic [ref=e152]: Lane Mtn by UltrAspire
            - generic [ref=e153]: no target set
          - generic [ref=e154]:
            - img [ref=e157]
            - generic [ref=e160]: cutoff Mon 10:45 PM
          - img [ref=e162]
      - button "36.6 Crown King by Tailwind no target set cutoff Mon 11:55 PM" [ref=e165] [cursor=pointer]:
        - generic [ref=e167]:
          - generic [ref=e168]: "36.6"
          - generic [ref=e169]:
            - generic [ref=e170]: Crown King by Tailwind
            - generic [ref=e171]: no target set
          - generic [ref=e172]:
            - generic [ref=e173]:
              - img [ref=e175]
              - img [ref=e181]
              - img [ref=e185]
            - generic [ref=e188]: cutoff Mon 11:55 PM
          - img [ref=e190]
      - button "51 Arrastra Creek no target set cutoff Tue 7:00 AM" [ref=e193] [cursor=pointer]:
        - generic [ref=e195]:
          - generic [ref=e196]: "51"
          - generic [ref=e197]:
            - generic [ref=e198]: Arrastra Creek
            - generic [ref=e199]: no target set
          - generic [ref=e202]: cutoff Tue 7:00 AM
          - img [ref=e204]
      - button "60.8 Kamp Kipa no target set cutoff Tue 2:00 PM" [ref=e207] [cursor=pointer]:
        - generic [ref=e209]:
          - generic [ref=e210]: "60.8"
          - generic [ref=e211]:
            - generic [ref=e212]: Kamp Kipa
            - generic [ref=e213]: no target set
          - generic [ref=e214]:
            - generic [ref=e215]:
              - img [ref=e217]
              - img [ref=e221]
            - generic [ref=e224]: cutoff Tue 2:00 PM
          - img [ref=e226]
      - button "67.4 Camp Wamatochick no target set cutoff Tue 4:45 PM" [ref=e229] [cursor=pointer]:
        - generic [ref=e231]:
          - generic [ref=e232]: "67.4"
          - generic [ref=e233]:
            - generic [ref=e234]: Camp Wamatochick
            - generic [ref=e235]: no target set
          - generic [ref=e236]:
            - generic [ref=e237]:
              - img [ref=e239]
              - img [ref=e243]
              - img [ref=e246]
            - generic [ref=e249]: cutoff Tue 4:45 PM
          - img [ref=e251]
      - button "75.7 Whiskey Row no target set cutoff Tue 10:00 PM" [ref=e254] [cursor=pointer]:
        - generic [ref=e256]:
          - generic [ref=e257]: "75.7"
          - generic [ref=e258]:
            - generic [ref=e259]: Whiskey Row
            - generic [ref=e260]: no target set
          - generic [ref=e261]:
            - generic [ref=e262]:
              - img [ref=e264]
              - img [ref=e270]
              - img [ref=e274]
              - img [ref=e278]
              - img [ref=e281]
            - generic [ref=e284]: cutoff Tue 10:00 PM
          - img [ref=e286]
      - button "82.8 Watson Lake no target set cutoff Wed 3:30 AM" [ref=e289] [cursor=pointer]:
        - generic [ref=e291]:
          - generic [ref=e292]: "82.8"
          - generic [ref=e293]:
            - generic [ref=e294]: Watson Lake
            - generic [ref=e295]: no target set
          - generic [ref=e296]:
            - generic [ref=e297]:
              - img [ref=e299]
              - img [ref=e305]
            - generic [ref=e309]: cutoff Wed 3:30 AM
          - img [ref=e311]
      - button "94.5 Fain Ranch by Satisfy no target set cutoff Wed 6:00 AM" [ref=e314] [cursor=pointer]:
        - generic [ref=e316]:
          - generic [ref=e317]: "94.5"
          - generic [ref=e318]:
            - generic [ref=e319]: Fain Ranch by Satisfy
            - generic [ref=e320]: no target set
          - generic [ref=e321]:
            - generic [ref=e322]:
              - img [ref=e324]
              - img [ref=e330]
              - img [ref=e334]
            - generic [ref=e338]: cutoff Wed 6:00 AM
          - img [ref=e340]
      - button "106.8 Mingus Mountain no target set cutoff Wed 1:00 PM" [ref=e343] [cursor=pointer]:
        - generic [ref=e345]:
          - generic [ref=e346]: "106.8"
          - generic [ref=e347]:
            - generic [ref=e348]: Mingus Mountain
            - generic [ref=e349]: no target set
          - generic [ref=e350]:
            - generic [ref=e351]:
              - img [ref=e353]
              - img [ref=e359]
              - img [ref=e363]
              - img [ref=e367]
              - img [ref=e370]
              - img [ref=e373]
            - generic [ref=e376]: cutoff Wed 1:00 PM
          - img [ref=e378]
      - button "123.8 Jerome no target set cutoff Wed 8:30 PM" [ref=e381] [cursor=pointer]:
        - generic [ref=e383]:
          - generic [ref=e384]: "123.8"
          - generic [ref=e385]:
            - generic [ref=e386]: Jerome
            - generic [ref=e387]: no target set
          - generic [ref=e388]:
            - generic [ref=e389]:
              - img [ref=e391]
              - img [ref=e397]
            - generic [ref=e401]: cutoff Wed 8:30 PM
          - img [ref=e403]
      - button "132.5 Dead Horse no target set cutoff Thu 12:00 AM" [ref=e406] [cursor=pointer]:
        - generic [ref=e408]:
          - generic [ref=e409]: "132.5"
          - generic [ref=e410]:
            - generic [ref=e411]: Dead Horse
            - generic [ref=e412]: no target set
          - generic [ref=e413]:
            - generic [ref=e414]:
              - img [ref=e416]
              - img [ref=e422]
              - img [ref=e426]
              - img [ref=e430]
              - img [ref=e433]
              - img [ref=e436]
            - generic [ref=e439]: cutoff Thu 12:00 AM
          - img [ref=e441]
      - button "146.5 Deer Pass no target set cutoff Thu 4:45 AM" [ref=e444] [cursor=pointer]:
        - generic [ref=e446]:
          - generic [ref=e447]: "146.5"
          - generic [ref=e448]:
            - generic [ref=e449]: Deer Pass
            - generic [ref=e450]: no target set
          - generic [ref=e451]:
            - img [ref=e454]
            - generic [ref=e458]: cutoff Thu 4:45 AM
          - img [ref=e460]
      - button "153.2 Water Station no target set no cutoff" [ref=e463] [cursor=pointer]:
        - generic [ref=e465]:
          - generic [ref=e466]: "153.2"
          - generic [ref=e467]:
            - generic [ref=e468]: Water Station
            - generic [ref=e469]: no target set
          - generic [ref=e471]: no cutoff
          - img [ref=e473]
      - button "158.8 Sedona Posse Grounds no target set cutoff Thu 12:00 PM" [ref=e476] [cursor=pointer]:
        - generic [ref=e478]:
          - generic [ref=e479]: "158.8"
          - generic [ref=e480]:
            - generic [ref=e481]: Sedona Posse Grounds
            - generic [ref=e482]: no target set
          - generic [ref=e483]:
            - generic [ref=e484]:
              - img [ref=e486]
              - img [ref=e492]
              - img [ref=e496]
              - img [ref=e500]
              - img [ref=e503]
            - generic [ref=e506]: cutoff Thu 12:00 PM
          - img [ref=e508]
      - button "170 Water Station no target set no cutoff" [ref=e511] [cursor=pointer]:
        - generic [ref=e513]:
          - generic [ref=e514]: "170"
          - generic [ref=e515]:
            - generic [ref=e516]: Water Station
            - generic [ref=e517]: no target set
          - generic [ref=e519]: no cutoff
          - img [ref=e521]
      - button "175.7 Schnebly Hill no target set cutoff Thu 9:00 PM" [ref=e524] [cursor=pointer]:
        - generic [ref=e526]:
          - generic [ref=e527]: "175.7"
          - generic [ref=e528]:
            - generic [ref=e529]: Schnebly Hill
            - generic [ref=e530]: no target set
          - generic [ref=e531]:
            - generic [ref=e532]:
              - img [ref=e534]
              - img [ref=e540]
              - img [ref=e544]
            - generic [ref=e547]: cutoff Thu 9:00 PM
          - img [ref=e549]
      - button "189.6 Munds Park no target set cutoff Fri 2:45 AM" [ref=e552] [cursor=pointer]:
        - generic [ref=e554]:
          - generic [ref=e555]: "189.6"
          - generic [ref=e556]:
            - generic [ref=e557]: Munds Park
            - generic [ref=e558]: no target set
          - generic [ref=e559]:
            - generic [ref=e560]:
              - img [ref=e562]
              - img [ref=e568]
              - img [ref=e572]
              - img [ref=e576]
              - img [ref=e579]
            - generic [ref=e582]: cutoff Fri 2:45 AM
          - img [ref=e584]
      - button "202.3 Kelly Canyon no target set cutoff Fri 8:00 AM" [ref=e587] [cursor=pointer]:
        - generic [ref=e589]:
          - generic [ref=e590]: "202.3"
          - generic [ref=e591]:
            - generic [ref=e592]: Kelly Canyon
            - generic [ref=e593]: no target set
          - generic [ref=e596]: cutoff Fri 8:00 AM
          - img [ref=e598]
      - button "210.6 Fort Tuthill no target set cutoff Fri 12:45 PM" [ref=e601] [cursor=pointer]:
        - generic [ref=e603]:
          - generic [ref=e604]: "210.6"
          - generic [ref=e605]:
            - generic [ref=e606]: Fort Tuthill
            - generic [ref=e607]: no target set
          - generic [ref=e608]:
            - generic [ref=e609]:
              - img [ref=e611]
              - img [ref=e617]
              - img [ref=e621]
              - img [ref=e625]
              - img [ref=e628]
            - generic [ref=e631]: cutoff Fri 12:45 PM
          - img [ref=e633]
      - button "226.8 Walnut Canyon no target set cutoff Fri 7:45 PM" [ref=e636] [cursor=pointer]:
        - generic [ref=e638]:
          - generic [ref=e639]: "226.8"
          - generic [ref=e640]:
            - generic [ref=e641]: Walnut Canyon
            - generic [ref=e642]: no target set
          - generic [ref=e643]:
            - generic [ref=e644]:
              - img [ref=e646]
              - img [ref=e652]
              - img [ref=e656]
              - img [ref=e660]
            - generic [ref=e663]: cutoff Fri 7:45 PM
          - img [ref=e665]
      - button "233.7 Wildcat Hill no target set cutoff Fri 10:45 PM" [ref=e668] [cursor=pointer]:
        - generic [ref=e670]:
          - generic [ref=e671]: "233.7"
          - generic [ref=e672]:
            - generic [ref=e673]: Wildcat Hill
            - generic [ref=e674]: no target set
          - generic [ref=e675]:
            - generic [ref=e676]:
              - img [ref=e678]
              - img [ref=e684]
            - generic [ref=e688]: cutoff Fri 10:45 PM
          - img [ref=e690]
      - button "249 Trinity Heights no target set cutoff Sat 8:15 AM" [ref=e693] [cursor=pointer]:
        - generic [ref=e695]:
          - generic [ref=e696]: "249"
          - generic [ref=e697]:
            - generic [ref=e698]: Trinity Heights
            - generic [ref=e699]: no target set
          - generic [ref=e702]: cutoff Sat 8:15 AM
          - img [ref=e704]
      - button "FINISH FINISH – Heritage Square no target set cutoff Sat 10:00 AM" [ref=e707] [cursor=pointer]:
        - generic [ref=e709]:
          - generic [ref=e710]: FINISH
          - generic [ref=e711]:
            - generic [ref=e712]: FINISH – Heritage Square
            - generic [ref=e713]: no target set
          - generic [ref=e714]:
            - generic [ref=e715]:
              - img [ref=e717]
              - img [ref=e723]
              - img [ref=e727]
              - img [ref=e731]
            - generic [ref=e734]: cutoff Sat 10:00 AM
          - img [ref=e736]
  - paragraph [ref=e739]: Cocodona 250 · May 4–9, 2026 · Organized by Aravaipa Running
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Cocodona 250 Runner Dashboard', () => {
  4  |   test('page loads with correct title', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     await expect(page).toHaveTitle(/Cocodona/);
  7  |   });
  8  | 
  9  |   test('header renders with race info', async ({ page }) => {
  10 |     await page.goto('/');
  11 |     await expect(page.getByText('Cocodona')).toBeVisible();
  12 |     await expect(page.getByText('250')).toBeVisible();
  13 |     await expect(page.getByText('252.9 miles')).toBeVisible();
  14 |   });
  15 | 
  16 |   test('tab navigation - all 8 tabs load without crashing', async ({ page }) => {
  17 |     await page.goto('/');
  18 | 
  19 |     const tabNames = [
  20 |       'Map',
  21 |       'Aid Stations',
  22 |       'Race Summary',
  23 |       'Schedule',
  24 |       'Required Gear',
  25 |       'Key Rules',
  26 |       'Course Info',
  27 |       'Pacing',
  28 |     ];
  29 | 
  30 |     for (const tab of tabNames) {
  31 |       await page.getByRole('button', { name: tab, exact: true }).click();
  32 |       // Verify the page still has content (no crash)
  33 |       await expect(page.locator('.min-h-screen')).toBeVisible();
  34 |     }
  35 |   });
  36 | 
  37 |   test('Map tab renders Leaflet map', async ({ page }) => {
  38 |     await page.goto('/');
  39 |     await page.getByRole('button', { name: 'Map', exact: true }).click();
  40 |     await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10000 });
  41 |   });
  42 | 
  43 |   test('Aid Stations tab shows stations and expands on click', async ({ page }) => {
  44 |     await page.goto('/');
  45 |     await page.getByRole('button', { name: 'Aid Stations', exact: true }).click();
  46 | 
  47 |     // Verify station rows appear - look for station buttons in the list
  48 |     const stationButtons = page.locator('button').filter({ hasText: /mi \d/ });
> 49 |     await expect(stationButtons.first()).toBeVisible({ timeout: 5000 });
     |                                          ^ Error: expect(locator).toBeVisible() failed
  50 | 
  51 |     // Click the first station to expand it
  52 |     await stationButtons.first().click();
  53 | 
  54 |     // Verify expanded content appears (the detail section)
  55 |     await expect(page.locator('text=Amenities').or(page.locator('text=amenities')).or(page.locator('text=Elevation')).or(page.locator('text=elevation'))).toBeVisible({ timeout: 5000 });
  56 |   });
  57 | 
  58 |   test('Schedule tab shows race schedule', async ({ page }) => {
  59 |     await page.goto('/');
  60 |     await page.getByRole('button', { name: 'Schedule', exact: true }).click();
  61 |     await expect(page.getByText('Mon May 4')).toBeVisible();
  62 |   });
  63 | 
  64 |   test('Required Gear tab shows gear list', async ({ page }) => {
  65 |     await page.goto('/');
  66 |     await page.getByRole('button', { name: 'Required Gear', exact: true }).click();
  67 |     await expect(page.getByText('Cell Phone')).toBeVisible();
  68 |   });
  69 | 
  70 |   test('Key Rules tab shows rules', async ({ page }) => {
  71 |     await page.goto('/');
  72 |     await page.getByRole('button', { name: 'Key Rules', exact: true }).click();
  73 |     await expect(page.getByText('No Outside Aid')).toBeVisible();
  74 |   });
  75 | 
  76 |   test('Course Info tab shows course stats', async ({ page }) => {
  77 |     await page.goto('/');
  78 |     await page.getByRole('button', { name: 'Course Info', exact: true }).click();
  79 |     await expect(page.getByText('252.9')).toBeVisible();
  80 |     await expect(page.getByText("40,667'")).toBeVisible();
  81 |   });
  82 | 
  83 |   test('Pacing tab renders input form', async ({ page }) => {
  84 |     await page.goto('/');
  85 |     await page.getByRole('button', { name: 'Pacing', exact: true }).click();
  86 |     // Look for the input fields (Base Pace, Target Finish, Pack Weight)
  87 |     await expect(page.locator('input[type="number"]').first()).toBeVisible({ timeout: 5000 });
  88 |     await expect(page.getByText('Base Pace')).toBeVisible();
  89 |   });
  90 | 
  91 |   test('Race Summary tab renders a table', async ({ page }) => {
  92 |     await page.goto('/');
  93 |     await page.getByRole('button', { name: 'Race Summary', exact: true }).click();
  94 |     await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
  95 |   });
  96 | });
  97 | 
```