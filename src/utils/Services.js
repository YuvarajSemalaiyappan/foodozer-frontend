export async function getRestaurants() {
  try {
    const response = await fetch("https://foodozer.onrender.com/restaurant/");
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getRestaurant(restaurantId = null) {
  if (!restaurantId) return;
  try {
    const response = await fetch(
      `https://foodozer.onrender.com/${restaurantId}`
    );
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getFoodForRestaurant(restaurantId = null) {
  if (!restaurantId) return;
  try {
    const response = await fetch(
      `https://foodozer.onrender.com/${restaurantId}`
    );
    let data;
    if (response.status === 200) {
      data = await response.json();
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
