import { connection } from "next/server";

export default async function CurrentYear() {
  await connection();

  const currentYear = new Date().getFullYear();

  return <>{currentYear}</>;
}
