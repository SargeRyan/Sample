// https://react-native-async-storage.github.io/async-storage/docs/usage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (storage_Key, value) => {
  try {
    await AsyncStorage.setItem(storage_Key, value);
    console.log(`Stored Data - ${storage_Key} : ${value} `);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

export const storeDataObject = async (storage_Key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storage_Key, jsonValue);
    console.log(`Stored Data - ${storage_Key} : ${jsonValue} `);
  } catch (e) {
    // saving error
    console.error(e);
  }
};

export const getData = async (storage_Key) => {
  try {
    const value = await AsyncStorage.getItem(storage_Key);
    console.log(`Get Data - ${storage_Key} : ${value} `);
    return value;
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

export const getDataObject = async (storage_Key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storage_Key);
    console.log(`Get Data - ${storage_Key} : ${jsonValue} `);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export const getMealsToday = async (dayToEat, timeToEat) => {
  try {
    let toGetMeals = [];

    // get meal keys
    let mealKeys = [];
    let allKeys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i].startsWith("@meal_")) {
        mealKeys.push(allKeys[i]);
      }
    }

    // get meal values
    let mealValues = await AsyncStorage.multiGet(mealKeys);
    for (let i = 0; i < mealValues.length; i++) {
      const mealKey = mealValues[i][0];
      const mealValue = JSON.parse(mealValues[i][1]);

      if (
        mealValue.dayToEat === dayToEat &&
        mealValue.timeToEat === timeToEat
      ) {
        if (mealValue.isChecked) {
          toGetMeals.push(mealValue);
        } else {
          toGetMeals.unshift(mealValue);
        }
      }
    }

    return toGetMeals;
  } catch (e) {
    console.error(e);
  }
};

export const mealDayToEat = {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday",
};

export const mealTimeToEat = {
  breakfast: "breakfast",
  lunch: "lunch",
  dinner: "dinner",
};
