import bcrypt from "bcryptjs";

export async function setValue(key: string, value: string): Promise<void> {
  const saltRounds = 10;
  try {
    const hashedValue = await bcrypt.hash(value, saltRounds);
    const encryptedValue = btoa(value);
    localStorage.setItem(
      key,
      JSON.stringify({ hashed: hashedValue, encrypted: encryptedValue })
    );
  } catch (error) {
    console.error("Error hashing value:", error);
  }
}

export async function getValue(key: string): Promise<string | null> {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      const decryptedValue = atob(parsedData.encrypted);
      return decryptedValue;
    } catch (error) {
      console.error("Error getting value:", error);
    }
  }
  return null;
}

export async function compareValue(
  key: string,
  valueToCompare: string
): Promise<boolean> {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      const match = await bcrypt.compare(valueToCompare, parsedData.hashed);
      return match;
    } catch (error) {
      console.error("Error comparing value:", error);
      return false;
    }
  }
  return false;
}
