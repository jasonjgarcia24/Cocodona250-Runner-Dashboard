# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.js >> Cocodona 250 Runner Dashboard >> Course Info tab shows course stats
- Location: tests/e2e/app.spec.js:76:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('252.9')
Expected: visible
Error: strict mode violation: getByText('252.9') resolved to 3 elements:
    1) <span class="font-semibold">252.9 miles</span> aka getByText('252.9 miles')
    2) <span>Mi 252.9 · Heritage Square</span> aka getByText('Mi 252.9 · Heritage Square')
    3) <div class="text-xl font-bold">252.9</div> aka getByText('252.9', { exact: true })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('252.9')

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
> 79 |     await expect(page.getByText('252.9')).toBeVisible();
     |                                           ^ Error: expect(locator).toBeVisible() failed
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