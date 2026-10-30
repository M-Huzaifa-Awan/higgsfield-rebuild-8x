import { expect, test } from "@playwright/test";

test("remixes an inspiration into the studio", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Make work worth stopping for/i })).toBeVisible();
  await page.getByRole("button", { name: /Afterhours atelier/i }).click();
  await expect(page.getByRole("heading", { name: "Make the idea tangible." })).toBeVisible();
  await expect(page.getByLabel("Describe your scene")).toContainText("couture silhouette");
});

test("creates an honest sample and stores it in projects", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Start creating/i }).click();
  const prompt = "A cobalt perfume bottle floating above rippled silver, hard studio light";
  await page.getByLabel("Describe your scene").fill(prompt);
  await page.getByRole("button", { name: "Create image" }).click();
  await expect(page.getByText("Sample output added to Projects")).toBeVisible({ timeout: 5000 });
  const navigationName = testInfo.project.name === "mobile" ? "Mobile navigation" : "Main navigation";
  await page.getByRole("navigation", { name: navigationName }).getByRole("button", { name: "Projects", exact: true }).click();
  await expect(page.getByRole("heading", { name: /A cobalt perfume bottle/ })).toBeVisible();
});

test("mobile layout has working bottom navigation and no horizontal overflow", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "mobile", "mobile-only assertion");
  await page.goto("/");
  const bottomNav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(bottomNav).toBeVisible();
  await bottomNav.getByRole("button", { name: /Create/ }).click();
  await expect(page.getByRole("heading", { name: "Make the idea tangible." })).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
