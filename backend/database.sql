CREATE TABLE person(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    birthdate VARCHAR(255),
    sex INTEGER,
    height INTEGER,
    userweight INTEGER,
    activity INTEGER,
    goal INTEGER,
    mealpreference VARCHAR(255),
    weightHistory VARCHAR(255),
    nutritionHirtory VARCHAR(255),
    lastupdate VARCHAR(255)
);

CREATE TABLE nutritionSettings(
    bmr INTEGER,
    dailyCalories INTEGER,
    proteinGoal INTEGER,
    fatsGoal INTEGER,
    carbohydratesGoal INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

CREATE TABLE mealPlan( -- 3
    id SERIAL PRIMARY KEY,
    creationDate VARCHAR(255),
    currentDate VARCHAR(255),
    meals VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

CREATE TABLE meal( -- 4
    id SERIAL PRIMARY KEY,
    mealType VARCHAR(255),
    recipes JSON,
    mealCalories JSON,
    mealplan_id INTEGER,
    FOREIGN KEY (mealplan_id) REFERENCES mealPlan (id)
);

CREATE TABLE recipe( -- 5
    id SERIAL PRIMARY KEY,
    recipeDescription VARCHAR(255),
    recipeComposition JSON,
    recipePFC INTEGER,
    recipeCaloris INTEGER,
    instructions VARCHAR(255),
    category JSON,
    meal_id INTEGER,
    FOREIGN KEY (meal_id) REFERENCES meal (id)
);

CREATE TABLE ingredient( -- 6
    id SERIAL PRIMARY KEY,
    ingredientName VARCHAR(255),
    ingredientComposition JSON,
    ingredientPFC JSON,
    retrictions JSON
);

CREATE TABLE foodLog( -- 7
    id SERIAL PRIMARY KEY,
    currentDate VARCHAR(255),
    eatenMeals VARCHAR(255),
    dailyPFC VARCHAR(255),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);

CREATE TABLE progress( -- 8
    progressDate VARCHAR(255),
    currentWeight FLOAT,
    bodyComposition JSON,
    comsumedCalories INTEGER,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES person (id)
);