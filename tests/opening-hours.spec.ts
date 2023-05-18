import { test, expect, Page } from '@playwright/test';
import {
  periodClosedNextDay,
  severalPeriodsPerDay,
  onePeriodPerEveryDay,
} from '../mocks/openingHours';

const BASE_TEST_URL = 'http://localhost:3030'

const beforeEach = async (page: Page, response: Record<string, unknown>): Promise<void> => {
  await page.route(`${BASE_TEST_URL}/data.json`, async route => {
    await route.fulfill({ json: { ...response } });
  });

  await page.goto(BASE_TEST_URL);
}

test.describe('Should test the openings app', () => {
  test('should render the openings for one period for every day', async ({ page }) => {
    await beforeEach(page, onePeriodPerEveryDay);

    await page.locator('text=Opening hours').waitFor();
    const dayInfos = await page.locator('data-testid=day-info');
    await expect(dayInfos).toHaveCount(7);

    const testSchema = [
      {
        day: 'Monday',
        openClose: 'Closed',
      },
      {
        day: 'Tuesday',
        openClose: '10 AM - 6 PM',
      },
      {
        day: 'Wednesday',
        openClose: 'Closed',
      },
      {
        day: 'Thursday',
        openClose: '10 AM - 6 PM',
      },
      {
        day: 'Friday',
        openClose: '10 AM - 6 PM',
      },
      {
        day: 'Saturday',
        openClose: '10 AM - 6 PM',
      },
      {
        day: 'Sunday',
        openClose: '12 PM - 9 PM',
      }
    ];

    for (let i = 0; i < await dayInfos.count(); i++) {
      const { day, openClose } = testSchema[i];
      await dayInfos.nth(i).locator(`text=${day}`).waitFor();
      await dayInfos.nth(i).locator(`text=${openClose}`).waitFor();
    }
  });

  test('should render the openings for period closed next day', async ({ page }) => {
    await beforeEach(page, periodClosedNextDay);

    const dayInfos = await page.locator('data-testid=day-info');
    await expect(dayInfos).toHaveCount(7);

    const testSchema = [
      {
        day: 'Monday',
        openClose: 'Closed',
      },
      {
        day: 'Tuesday',
        openClose: 'Closed',
      },
      {
        day: 'Wednesday',
        openClose: 'Closed',
      },
      {
        day: 'Thursday',
        openClose: 'Closed',
      },
      {
        day: 'Friday',
        openClose: '10 AM - 1 AM',
      },
      {
        day: 'Saturday',
        openClose: '10 AM - 1 AM',
      },
      {
        day: 'Sunday',
        openClose: '12 PM - 9 PM',
      }
    ];

    for (let i = 0; i < await dayInfos.count(); i++) {
      const { day, openClose } = testSchema[i];
      await dayInfos.nth(i).locator(`text=${day}`).waitFor();
      await dayInfos.nth(i).locator(`text=${openClose}`).waitFor();
    }
  });

  test('should render the openings for several periods a day', async ({ page }) => {
    await beforeEach(page, severalPeriodsPerDay);

    await page.locator('text=Opening hours').waitFor();
    const dayInfos = await page.locator('data-testid=day-info');
    await expect(dayInfos).toHaveCount(7);

    const testSchema = [
      {
        day: 'Monday',
        openClose: 'Closed',
      },
      {
        day: 'Tuesday',
        openClose: ['10 AM - 2 PM', '3 PM - 9 PM'],
      },
      {
        day: 'Wednesday',
        openClose: 'Closed',
      },
      {
        day: 'Thursday',
        openClose: 'Closed',
      },
      {
        day: 'Friday',
        openClose: 'Closed',
      },
      {
        day: 'Saturday',
        openClose: 'Closed',
      },
      {
        day: 'Sunday',
        openClose: 'Closed',
      }
    ];

    for (let i = 0; i < await dayInfos.count(); i++) {
      const { day, openClose } = testSchema[i];
      await dayInfos.nth(i).locator(`text=${day}`).waitFor();
      if (Array.isArray(openClose)) {
        for (const range of openClose) {
          await dayInfos.nth(i).locator(`text=${range}`).waitFor();
        }
      } else {
        await dayInfos.nth(i).locator(`text=${openClose}`).waitFor();
      }
    }
  });
});
