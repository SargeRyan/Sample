// https://react-native-async-storage.github.io/async-storage/docs/usage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveDataToCloud } from "./Screens/Dashboard/global";

export const isUniqueKey = async (storage_Key) => {
  try {
    const value = await AsyncStorage.getItem(storage_Key);
    console.log(`Get Data (is Unique) - ${storage_Key} : ${value} `);
    return value == null ? true : false;
  } catch (e) {
    // error reading value
    console.error(e);
  }
};

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
    // await AsyncStorage.clear();
    let toGetMeals = [];

    // get meal keys
    let mealKeys = [];
    let allKeys = await AsyncStorage.getAllKeys();
    let userData = await AsyncStorage.getItem('userData');
    if(userData)userData = JSON.parse(userData);
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i].startsWith("@meal_")) {
        mealKeys.push(allKeys[i]);
      }
    }
    // get meal values
    let mealValues = await AsyncStorage.multiGet(mealKeys);
    console.log("All Meals ===========", JSON.stringify(mealValues));
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
    const toStoreData = {
      id: userData.id,
      mealValues: mealValues,
    }
    if(userData)await saveDataToCloud(userData.id, "mealValues",JSON.stringify(toStoreData));
    return toGetMeals;
  } catch (e) {
    console.error(e);
  }
};

export const getMealsSelection = async () => {
  try {
    let toGetMeals = [];

    // get meal keys
    let mealKeys = [];
    let allKeys = await AsyncStorage.getAllKeys();
    for (let i = 0; i < allKeys.length; i++) {
      if (allKeys[i].startsWith("@selection_meal_")) {
        mealKeys.push(allKeys[i]);
      }
    }

    console.log("getMealsSelection =====",mealKeys);

    // get meal values
    let mealValues = await AsyncStorage.multiGet(mealKeys);
    for (let i = 0; i < mealValues.length; i++) {
      const mealKey = mealValues[i][0];
      const mealValue = JSON.parse(mealValues[i][1]);
      toGetMeals.push(mealValue);
    }

    return toGetMeals;
  } catch (e) {
    console.error(e);
  }
};

export const mealDayToEat = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const mealTimeToEat = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export const removeValue = async (key) => {
    console.log("AsyncStorage Removing Key: " + key);
    try {
      await AsyncStorage.removeItem(key)
    } catch(e) {
      console.error(e);
    }
    console.log("AsyncStorage Removed Key: " + key);
  }


export const getEatenMealAsync = async () => {
    try {
        // get meal keys
        let mealKeys = [];
        let allKeys = await AsyncStorage.getAllKeys();
        for (let i = 0; i < allKeys.length; i++) {
          if (allKeys[i].startsWith("eaten_")) {
            mealKeys.push(allKeys[i]);
          }
        }
        
        let userData = await AsyncStorage.getItem('userData');
        if(userData)userData = JSON.parse(userData);

        // get meal values
        let mealEatean = await AsyncStorage.multiGet(mealKeys);
        const toStoreData = {
          id: userData.id,
          mealEatean: mealEatean,
        }
        if(userData)await saveDataToCloud(userData.id, "mealEatean",JSON.stringify(toStoreData));
        return JSON.stringify(mealEatean);
      } catch (e) {
        console.error(e);
      }
};
export const getIDgraph = async () => {
  try {
      // get meal keys
      let mealKeys = [];
      let allKeys = await AsyncStorage.getAllKeys();
      for (let i = 0; i < allKeys.length; i++) {
        if (allKeys[i].startsWith("eaten_")) {
          mealKeys.push(allKeys[i]);
        }
      }
      // get meal values
      let mealValues = await AsyncStorage.multiGet(mealKeys);

      return JSON.stringify(mealValues);
    } catch (e) {
      console.error(e);
    }
};