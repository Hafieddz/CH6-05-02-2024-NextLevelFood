import Image from "next/image";
import styles from "./page.module.css";
import { getMealById } from "@/lib/meals";
import { notFound } from "next/navigation";

export default function MealsDetailPage({ params }) {
  const meal = getMealById(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");
  return (
    <>
      <header className={styles.header}>
        <div className={styles.image}>
          <Image src={meal.image} fill />
        </div>
        <div className={styles.headerText}>
          <h1>{meal.title}</h1>
          <p className={styles.creator}>
            by <a href={""}>{meal.creator}</a>
          </p>
          <p className={styles.summary}>{meal.summary}</p>
          <p
            className={styles.instructions}
            dangerouslySetInnerHTML={{ __html: meal.instructions }}
          ></p>
        </div>
      </header>

      <main></main>
    </>
  );
}
