# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Cocodona 250 Runner Dashboard >> Pacing tab renders input form
- Location: tests/e2e/app.spec.js:83:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Base Pace')
Expected: visible
Error: strict mode violation: getByText('Base Pace') resolved to 2 elements:
    1) <label>Base Pace (min/mile)</label> aka getByText('Base Pace (min/mile)')
    2) <div>Base Pace</div> aka getByText('Base Pace', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Base Pace')

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
    - button "Aid Stations" [ref=e23]
    - button "Race Summary" [ref=e24]
    - button "Schedule" [ref=e25]
    - button "Required Gear" [ref=e26]
    - button "Key Rules" [ref=e27]
    - button "Course Info" [ref=e28]
    - button "Pacing" [active] [ref=e29]
  - generic [ref=e31]:
    - generic [ref=e32]: Pacing Calculator
    - generic [ref=e34]:
      - generic [ref=e35]: Runner Profile
      - generic [ref=e36]:
        - generic [ref=e37]:
          - generic [ref=e38]: Base Pace (min/mile)
          - spinbutton [ref=e39]: "15"
          - generic [ref=e40]: Flat-trail pace (e.g., 15 for a 100h target)
        - generic [ref=e41]:
          - generic [ref=e42]: Target Finish (hours)
          - spinbutton [ref=e43]: "100"
          - generic [ref=e44]: Race cutoff is 125 hours
        - generic [ref=e45]:
          - generic [ref=e46]: Pack Weight (lbs)
          - spinbutton [ref=e47]: "12"
          - generic [ref=e48]: Average carry weight (base 10 lbs neutral)
      - generic [ref=e49]:
        - generic [ref=e50]: Planned Sleep Stops
        - generic [ref=e51]:
          - combobox [ref=e52]:
            - option "Kamp Kipa (mi 60.8) - Indoor" [selected]
            - option "Camp Wamatochick (mi 67.4) - Indoor"
            - option "Whiskey Row (mi 75.7) - Indoor"
            - option "Mingus Mountain (mi 106.8) - Indoor"
            - option "Dead Horse (mi 132.5) - Outdoor"
            - option "Sedona Posse Grounds (mi 158.8) - Indoor"
            - option "Munds Park (mi 189.6) - Outdoor"
            - option "Fort Tuthill (mi 210.6) - Indoor"
          - spinbutton [ref=e53]: "30"
          - generic [ref=e54]: min
          - button "+ Add Stop" [ref=e55] [cursor=pointer]
        - generic [ref=e56]:
          - text: "Total planned sleep:"
          - strong [ref=e57]: 0 min (0.0h)
    - generic [ref=e58]:
      - generic [ref=e59]: Pacing Summary
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: 117.5h
          - generic [ref=e63]: Projected Finish
        - generic [ref=e64]:
          - generic [ref=e65]: 8h buffer
          - generic [ref=e66]: vs. 125h Cutoff
        - generic [ref=e67]:
          - generic [ref=e68]: "0"
          - generic [ref=e69]: Station Cutoff Warnings
        - generic [ref=e70]:
          - generic [ref=e71]: 15:00
          - generic [ref=e72]: Base Pace
        - generic [ref=e73]:
          - generic [ref=e74]: 0 min
          - generic [ref=e75]: Planned Sleep
        - generic [ref=e76]:
          - generic [ref=e77]: 12 lbs
          - generic [ref=e78]: Pack Weight
      - generic [ref=e80]:
        - generic [ref=e81]: Average Multipliers
        - generic [ref=e82]:
          - generic [ref=e83]:
            - text: "Terrain:"
            - strong [ref=e84]: 1.146x
          - generic [ref=e85]:
            - text: "Heat:"
            - strong [ref=e86]: 1.026x
          - generic [ref=e87]:
            - text: "Night:"
            - strong [ref=e88]: 1.036x
          - generic [ref=e89]:
            - text: "Fatigue:"
            - strong [ref=e90]: 1.133x
          - generic [ref=e91]:
            - text: "Sleep Debt:"
            - strong [ref=e92]: 1.259x
          - generic [ref=e93]:
            - text: "Pack Wt:"
            - strong [ref=e94]: 1.016x
      - generic [ref=e97]:
        - generic [ref=e98]: Section Breakdown
        - table [ref=e99]:
          - rowgroup [ref=e100]:
            - row "Station Mile Pace Leg Arrival Buffer" [ref=e101]:
              - columnheader "Station" [ref=e102]
              - columnheader "Mile" [ref=e103]
              - columnheader "Pace" [ref=e104]
              - columnheader "Leg" [ref=e105]
              - columnheader "Arrival" [ref=e106]
              - columnheader "Buffer" [ref=e107]
          - rowgroup [ref=e108]:
            - row "Cottonwood Creek 7.4 19:42 2:26 Mon 7:25 AM 144m" [ref=e109]:
              - cell "Cottonwood Creek" [ref=e110]
              - cell "7.4" [ref=e111]
              - cell "19:42" [ref=e112]
              - cell "2:26" [ref=e113]
              - cell "Mon 7:25 AM" [ref=e114]
              - cell "144m" [ref=e115]
            - row "Water Station 10.4 19:06 0:57 Mon 8:27 AM --" [ref=e116]:
              - cell "Water Station" [ref=e117]
              - cell "10.4" [ref=e118]
              - cell "19:06" [ref=e119]
              - cell "0:57" [ref=e120]
              - cell "Mon 8:27 AM" [ref=e121]
              - cell "--" [ref=e122]
            - row "Water Station 24.6 17:42 4:12 Mon 12:41 PM --" [ref=e123]:
              - cell "Water Station" [ref=e124]
              - cell "24.6" [ref=e125]
              - cell "17:42" [ref=e126]
              - cell "4:12" [ref=e127]
              - cell "Mon 12:41 PM" [ref=e128]
              - cell "--" [ref=e129]
            - row "Lane Mtn by UltrAspire 32.5 21:00 2:46 Mon 3:29 PM 435m" [ref=e130]:
              - cell "Lane Mtn by UltrAspire" [ref=e131]
              - cell "32.5" [ref=e132]
              - cell "21:00" [ref=e133]
              - cell "2:46" [ref=e134]
              - cell "Mon 3:29 PM" [ref=e135]
              - cell "435m" [ref=e136]
            - row "Crown King by Tailwind 36.6 24:54 1:42 Mon 5:18 PM 396m" [ref=e137]:
              - cell "Crown King by Tailwind" [ref=e138]
              - cell "36.6" [ref=e139]
              - cell "24:54" [ref=e140]
              - cell "1:42" [ref=e141]
              - cell "Mon 5:18 PM" [ref=e142]
              - cell "396m" [ref=e143]
            - row "Arrastra Creek 51 18:48 4:31 Mon 10:01 PM 538m" [ref=e144]:
              - cell "Arrastra Creek" [ref=e145]
              - cell "51" [ref=e146]
              - cell "18:48" [ref=e147]
              - cell "4:31" [ref=e148]
              - cell "Mon 10:01 PM" [ref=e149]
              - cell "538m" [ref=e150]
            - row "Kamp Kipa 60.8 19:36 3:12 Tue 1:18 AM 762m" [ref=e151]:
              - cell "Kamp Kipa" [ref=e152]
              - cell "60.8" [ref=e153]
              - cell "19:36" [ref=e154]
              - cell "3:12" [ref=e155]
              - cell "Tue 1:18 AM" [ref=e156]
              - cell "762m" [ref=e157]
            - row "Camp Wamatochick 67.4 17:54 1:58 Tue 3:21 AM 803m" [ref=e158]:
              - cell "Camp Wamatochick" [ref=e159]
              - cell "67.4" [ref=e160]
              - cell "17:54" [ref=e161]
              - cell "1:58" [ref=e162]
              - cell "Tue 3:21 AM" [ref=e163]
              - cell "803m" [ref=e164]
            - row "Whiskey Row 75.7 17:48 2:27 Tue 5:59 AM 961m" [ref=e165]:
              - cell "Whiskey Row" [ref=e166]
              - cell "75.7" [ref=e167]
              - cell "17:48" [ref=e168]
              - cell "2:27" [ref=e169]
              - cell "Tue 5:59 AM" [ref=e170]
              - cell "961m" [ref=e171]
            - row "Watson Lake 82.8 17:42 2:06 Tue 8:17 AM 1153m" [ref=e172]:
              - cell "Watson Lake" [ref=e173]
              - cell "82.8" [ref=e174]
              - cell "17:42" [ref=e175]
              - cell "2:06" [ref=e176]
              - cell "Tue 8:17 AM" [ref=e177]
              - cell "1153m" [ref=e178]
            - row "Fain Ranch by Satisfy 94.5 17:42 3:28 Tue 11:54 AM 1085m" [ref=e179]:
              - cell "Fain Ranch by Satisfy" [ref=e180]
              - cell "94.5" [ref=e181]
              - cell "17:42" [ref=e182]
              - cell "3:28" [ref=e183]
              - cell "Tue 11:54 AM" [ref=e184]
              - cell "1085m" [ref=e185]
            - row "Mingus Mountain 106.8 25:12 5:10 Tue 5:14 PM 1186m" [ref=e186]:
              - cell "Mingus Mountain" [ref=e187]
              - cell "106.8" [ref=e188]
              - cell "25:12" [ref=e189]
              - cell "5:10" [ref=e190]
              - cell "Tue 5:14 PM" [ref=e191]
              - cell "1186m" [ref=e192]
            - row "Jerome 123.8 25:06 7:07 Wed 12:38 AM 1192m" [ref=e193]:
              - cell "Jerome" [ref=e194]
              - cell "123.8" [ref=e195]
              - cell "25:06" [ref=e196]
              - cell "7:07" [ref=e197]
              - cell "Wed 12:38 AM" [ref=e198]
              - cell "1192m" [ref=e199]
            - row "Dead Horse 132.5 23:00 3:20 Wed 4:08 AM 1192m" [ref=e200]:
              - cell "Dead Horse" [ref=e201]
              - cell "132.5" [ref=e202]
              - cell "23:00" [ref=e203]
              - cell "3:20" [ref=e204]
              - cell "Wed 4:08 AM" [ref=e205]
              - cell "1192m" [ref=e206]
            - row "Deer Pass 146.5 25:48 6:01 Wed 10:26 AM 1099m" [ref=e207]:
              - cell "Deer Pass" [ref=e208]
              - cell "146.5" [ref=e209]
              - cell "25:48" [ref=e210]
              - cell "6:01" [ref=e211]
              - cell "Wed 10:26 AM" [ref=e212]
              - cell "1099m" [ref=e213]
            - row "Water Station 153.2 28:12 3:09 Wed 1:40 PM --" [ref=e214]:
              - cell "Water Station" [ref=e215]
              - cell "153.2" [ref=e216]
              - cell "28:12" [ref=e217]
              - cell "3:09" [ref=e218]
              - cell "Wed 1:40 PM" [ref=e219]
              - cell "--" [ref=e220]
            - row "Sedona Posse Grounds 158.8 30:12 2:49 Wed 4:31 PM 1169m" [ref=e221]:
              - cell "Sedona Posse Grounds" [ref=e222]
              - cell "158.8" [ref=e223]
              - cell "30:12" [ref=e224]
              - cell "2:49" [ref=e225]
              - cell "Wed 4:31 PM" [ref=e226]
              - cell "1169m" [ref=e227]
            - row "Water Station 170 27:54 5:12 Wed 9:55 PM --" [ref=e228]:
              - cell "Water Station" [ref=e229]
              - cell "170" [ref=e230]
              - cell "27:54" [ref=e231]
              - cell "5:12" [ref=e232]
              - cell "Wed 9:55 PM" [ref=e233]
              - cell "--" [ref=e234]
            - row "Schnebly Hill 175.7 32:48 3:07 Thu 1:04 AM 1195m" [ref=e235]:
              - cell "Schnebly Hill" [ref=e236]
              - cell "175.7" [ref=e237]
              - cell "32:48" [ref=e238]
              - cell "3:07" [ref=e239]
              - cell "Thu 1:04 AM" [ref=e240]
              - cell "1195m" [ref=e241]
            - row "Munds Park 189.6 37:48 8:45 Thu 10:01 AM 1003m" [ref=e242]:
              - cell "Munds Park" [ref=e243]
              - cell "189.6" [ref=e244]
              - cell "37:48" [ref=e245]
              - cell "8:45" [ref=e246]
              - cell "Thu 10:01 AM" [ref=e247]
              - cell "1003m" [ref=e248]
            - row "Kelly Canyon 202.3 30:24 6:26 Thu 4:40 PM 920m" [ref=e249]:
              - cell "Kelly Canyon" [ref=e250]
              - cell "202.3" [ref=e251]
              - cell "30:24" [ref=e252]
              - cell "6:26" [ref=e253]
              - cell "Thu 4:40 PM" [ref=e254]
              - cell "920m" [ref=e255]
            - row "Fort Tuthill 210.6 31:48 4:24 Thu 9:09 PM 936m" [ref=e256]:
              - cell "Fort Tuthill" [ref=e257]
              - cell "210.6" [ref=e258]
              - cell "31:48" [ref=e259]
              - cell "4:24" [ref=e260]
              - cell "Thu 9:09 PM" [ref=e261]
              - cell "936m" [ref=e262]
            - row "Walnut Canyon 226.8 39:54 10:47 Fri 8:08 AM 697m" [ref=e263]:
              - cell "Walnut Canyon" [ref=e264]
              - cell "226.8" [ref=e265]
              - cell "39:54" [ref=e266]
              - cell "10:47" [ref=e267]
              - cell "Fri 8:08 AM" [ref=e268]
              - cell "697m" [ref=e269]
            - row "Wildcat Hill 233.7 39:48 4:34 Fri 12:54 PM 591m" [ref=e270]:
              - cell "Wildcat Hill" [ref=e271]
              - cell "233.7" [ref=e272]
              - cell "39:48" [ref=e273]
              - cell "4:34" [ref=e274]
              - cell "Fri 12:54 PM" [ref=e275]
              - cell "591m" [ref=e276]
            - row "Trinity Heights 249 40:24 10:18 Fri 11:21 PM 533m" [ref=e277]:
              - cell "Trinity Heights" [ref=e278]
              - cell "249" [ref=e279]
              - cell "40:24" [ref=e280]
              - cell "10:18" [ref=e281]
              - cell "Fri 11:21 PM" [ref=e282]
              - cell "533m" [ref=e283]
            - row "FINISH – Heritage Square 252.9 43:30 2:50 Sat 2:16 AM 463m" [ref=e284]:
              - cell "FINISH – Heritage Square" [ref=e285]
              - cell "252.9" [ref=e286]
              - cell "43:30" [ref=e287]
              - cell "2:50" [ref=e288]
              - cell "Sat 2:16 AM" [ref=e289]
              - cell "463m" [ref=e290]
  - paragraph [ref=e292]: Cocodona 250 · May 4–9, 2026 · Organized by Aravaipa Running
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
  49 |     await expect(stationButtons.first()).toBeVisible({ timeout: 5000 });
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
> 88 |     await expect(page.getByText('Base Pace')).toBeVisible();
     |                                               ^ Error: expect(locator).toBeVisible() failed
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