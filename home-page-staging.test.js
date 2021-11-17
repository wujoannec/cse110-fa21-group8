describe("Basic user flow for Website", () => {
  // First, visit the website
  beforeAll(async () => {
    await page.goto(
      "https://testing.tianyuezhang1997.site/cse110-fa21-group8/home-page-staging/source/home-page"
    );
  });

  // Keep checking whether there is some "ERROR" in the console log
  page.on("console", (message) => {
    const logMsg =
      message.type() + " " + message.location().url + " " + message.text();
    const logType = message.type();
    if (logType === "error") {
      console.log(logMsg);
    }
    expect(message.type()).not.toBe("error");
  });

  // Expected number of recipes on each page
  const numRecipes = 2;

  it("Initial Home Page - Check all recipes are fully populated", async () => {
    isRecipePolulated();
  });

  // Check all recipes are fully populated
  async function isRecipePolulated() {
    let allArePopulated = true;
    let recipeNames = [];
    const recipeItems = await page.$$(".recipe");
    for (let i = 0; i < numRecipes; i++) {
      console.log(`Checking recipe item ${i + 1}/${recipeItems.length}`);
      // get "recipe name"
      const innerText = await recipeItems[i].getProperty("innerText");
      const recipeName = innerText["_remoteObject"].value;
      // get "recipe image"
      const imgSrc = await recipeItems[i].$eval("img", (img) => {
        return img.src;
      });
      // test fail if any value is empty
      if (recipeName.length == 0) {
        allArePopulated = false;
      }
      if (imgSrc.length == 0) {
        allArePopulated = false;
      }
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);
      recipeNames.push(recipeName);
    }
    return recipeNames;
  }

  it("Check [right arrow] & [left arrow] button functioning", async () => {
    // Check all 9 recipes are fully populated
    // after clicking the [right arrow] button
    let button = await page.$("#right");
    await button.click();
    let recipeNames_1 = await isRecipePolulated();
    // Check all 9 recipes are fully populated
    // after clicking the [left arrow] button
    button = await page.$("#left");
    await button.click();
    let recipeNames_2 = await isRecipePolulated();
    // Check none of the recipe in both page 1 and page 2
    for (let i = 0; i < numRecipes; i++) {
      expect(recipeNames_2.includes(recipeNames_1[i])).toBe(false);
    }
  });
});
