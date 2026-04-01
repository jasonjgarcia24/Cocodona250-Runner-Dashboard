# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Cocodona 250 Runner Dashboard >> Course Info tab shows course stats
- Location: tests/e2e/app.spec.js:74:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('40,667\'')
Expected: visible
Error: strict mode violation: getByText('40,667\'') resolved to 2 elements:
    1) <span class="font-semibold">40,667' gain</span> aka getByText('\' gain')
    2) <div class="text-xl font-bold">40,667'</div> aka getByText('40,667\'', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('40,667\'')

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
    - button "Course Info" [active] [ref=e28]
    - button "Pacing" [ref=e29]
  - generic [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - generic [ref=e34]: "252.9"
        - generic [ref=e35]: Total Miles
      - generic [ref=e36]:
        - generic [ref=e37]: 40,667'
        - generic [ref=e38]: Total Gain
      - generic [ref=e39]:
        - generic [ref=e40]: 35,674'
        - generic [ref=e41]: Total Loss
      - generic [ref=e42]:
        - generic [ref=e43]: 125 hrs
        - generic [ref=e44]: Cutoff Time
    - generic [ref=e45]:
      - generic [ref=e46]: The Journey
      - generic [ref=e48]:
        - paragraph [ref=e49]:
          - text: Starting in the
          - strong [ref=e50]: Sonoran Desert
          - text: at Deep Canyon Ranch (Black Canyon City), the course winds through towering Saguaro cacti in extreme desert heat before climbing dramatically into the Bradshaw Mountains.
        - paragraph [ref=e51]:
          - text: Through the historic mining town of
          - strong [ref=e52]: Crown King
          - text: ", along ridgelines and remote single-track, into"
          - strong [ref=e53]: Prescott
          - text: (Whiskey Row), past the iconic Watson Lake formations, and up over
          - strong [ref=e54]: Mingus Mountain
          - text: .
        - paragraph [ref=e55]:
          - text: Into the copper mining ghost town of
          - strong [ref=e56]: Jerome
          - text: ", down into the Verde Valley, through"
          - strong [ref=e57]: Sedona's
          - text: famous red rock landscapes, up through Schnebly Hill, and into the cool Ponderosa Pine forests surrounding
          - strong [ref=e58]: Flagstaff
          - text: .
        - paragraph [ref=e59]:
          - text: Finishing at
          - strong [ref=e60]: Heritage Square in Flagstaff
          - text: — cutoff Saturday May 9, 10:00 AM.
    - generic [ref=e61]:
      - generic [ref=e62]: Elevation Range
      - generic [ref=e63]:
        - generic [ref=e64]:
          - generic [ref=e65]: 2,000'–4,000'
          - generic [ref=e66]:
            - generic [ref=e67]: Low Desert Sections
            - generic [ref=e68]: Extremely hot during day
        - generic [ref=e69]:
          - generic [ref=e70]: 5,000'–6,000'
          - generic [ref=e71]:
            - generic [ref=e72]: Mid Elevation (Prescott area)
            - generic [ref=e73]: Comfortable, variable
        - generic [ref=e74]:
          - generic [ref=e75]: 7,000'–9,000'
          - generic [ref=e76]:
            - generic [ref=e77]: High Elevation (Mingus / Flagstaff)
            - generic [ref=e78]: Can be extremely cold at night
    - generic [ref=e79]:
      - generic [ref=e80]: Western States Qualifier
      - generic [ref=e81]:
        - paragraph [ref=e82]:
          - text: Completing within the 125-hour cutoff earns an automatic qualifier for the
          - strong [ref=e83]: 2027 Western States Endurance Run
          - text: . No submission required — it's automatic.
        - paragraph [ref=e84]: ITRA and UTMB points also awarded automatically within 60 days of the race.
    - generic [ref=e85]:
      - generic [ref=e86]: Emergency Contact
      - generic [ref=e87]:
        - generic [ref=e88]: (602) 830-4526
        - generic [ref=e89]: TEXT ONLY — Race Command. Program into your phone before race day.
        - generic [ref=e90]: Provide bib number, location, and description of the issue.
  - paragraph [ref=e92]: Cocodona 250 · May 4–9, 2026 · Organized by Aravaipa Running
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
  11 |     await expect(page.getByText('Cocodona', { exact: true })).toBeVisible();
  12 |     await expect(page.getByText('252.9 miles')).toBeVisible();
  13 |   });
  14 | 
  15 |   test('tab navigation - all 8 tabs load without crashing', async ({ page }) => {
  16 |     await page.goto('/');
  17 | 
  18 |     const tabNames = [
  19 |       'Map',
  20 |       'Aid Stations',
  21 |       'Race Summary',
  22 |       'Schedule',
  23 |       'Required Gear',
  24 |       'Key Rules',
  25 |       'Course Info',
  26 |       'Pacing',
  27 |     ];
  28 | 
  29 |     for (const tab of tabNames) {
  30 |       await page.getByRole('button', { name: tab, exact: true }).click();
  31 |       // Verify the page still has content (no crash)
  32 |       await expect(page.locator('.min-h-screen')).toBeVisible();
  33 |     }
  34 |   });
  35 | 
  36 |   test('Map tab renders Leaflet map', async ({ page }) => {
  37 |     await page.goto('/');
  38 |     await page.getByRole('button', { name: 'Map', exact: true }).click();
  39 |     await expect(page.locator('.leaflet-container')).toBeVisible({ timeout: 10000 });
  40 |   });
  41 | 
  42 |   test('Aid Stations tab shows stations and expands on click', async ({ page }) => {
  43 |     await page.goto('/');
  44 |     await page.getByRole('button', { name: 'Aid Stations', exact: true }).click();
  45 | 
  46 |     // Verify station list renders with station names
  47 |     await expect(page.getByText('Cottonwood Creek')).toBeVisible({ timeout: 5000 });
  48 | 
  49 |     // Click the first station row to expand it
  50 |     await page.getByText('Start Line').click();
  51 | 
  52 |     // Verify expanded content appears (My Plan button)
  53 |     await expect(page.getByText('My Plan')).toBeVisible({ timeout: 5000 });
  54 |   });
  55 | 
  56 |   test('Schedule tab shows race schedule', async ({ page }) => {
  57 |     await page.goto('/');
  58 |     await page.getByRole('button', { name: 'Schedule', exact: true }).click();
  59 |     await expect(page.getByText('Mon May 4')).toBeVisible();
  60 |   });
  61 | 
  62 |   test('Required Gear tab shows gear list', async ({ page }) => {
  63 |     await page.goto('/');
  64 |     await page.getByRole('button', { name: 'Required Gear', exact: true }).click();
  65 |     await expect(page.getByText('Cell Phone')).toBeVisible();
  66 |   });
  67 | 
  68 |   test('Key Rules tab shows rules', async ({ page }) => {
  69 |     await page.goto('/');
  70 |     await page.getByRole('button', { name: 'Key Rules', exact: true }).click();
  71 |     await expect(page.getByText('No Outside Aid')).toBeVisible();
  72 |   });
  73 | 
  74 |   test('Course Info tab shows course stats', async ({ page }) => {
  75 |     await page.goto('/');
  76 |     await page.getByRole('button', { name: 'Course Info', exact: true }).click();
  77 |     await expect(page.getByText('252.9', { exact: true })).toBeVisible();
> 78 |     await expect(page.getByText("40,667'")).toBeVisible();
     |                                             ^ Error: expect(locator).toBeVisible() failed
  79 |   });
  80 | 
  81 |   test('Pacing tab renders input form', async ({ page }) => {
  82 |     await page.goto('/');
  83 |     await page.getByRole('button', { name: 'Pacing', exact: true }).click();
  84 |     // Look for the input fields (Base Pace, Target Finish, Pack Weight)
  85 |     await expect(page.locator('input[type="number"]').first()).toBeVisible({ timeout: 5000 });
  86 |     await expect(page.getByText('Base Pace', { exact: true }).first()).toBeVisible();
  87 |   });
  88 | 
  89 |   test('Race Summary tab renders a table', async ({ page }) => {
  90 |     await page.goto('/');
  91 |     await page.getByRole('button', { name: 'Race Summary', exact: true }).click();
  92 |     await expect(page.locator('table')).toBeVisible({ timeout: 5000 });
  93 |   });
  94 | });
  95 | 
```