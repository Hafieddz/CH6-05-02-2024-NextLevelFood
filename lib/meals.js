import sql from "better-sqlite3";
import { log } from "node:console";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return db.prepare("SELECT * FROM meals").all();
}

export function getMealById(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  console.log(meal);
  // const extension = await meal.image.name.split(".").pop();
  // const filename = `${meal.title}.${extension}`;

  // const stream = fs.createWriteStream(`public/images/${filename}`);
  // const bufferedImage = await meal.image.arrayBuffer();

  // stream.write(Buffer.from(bufferedImage));

  db.prepare(`INSERT INTO meals 
    (title, summary, instructions, creator, creator_email, image, slug) 
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`
  ).run(meal);
}
