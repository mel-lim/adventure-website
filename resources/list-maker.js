// Objects containing information for the lists, including the 'suggested' items
const skiLists = {
  gearList: {
    activity:'ski',
    listTitle: 'Gear',
    itemDisplayNames: ['Skis/snowboard, poles, boots, skins', 'Transceiver, probe, shovel and spare batteries', 'Touring skis/splitboard', 'Helmet, goggles, sunglasses', 'Whistle', 'Medical kit', 'Duct tape, zip ties, multitool, knife, ski straps', 'Headtorch, compass, lighter', 'Ski crampons']
  },
  clothingList: {
    activity:'ski',
    listTitle: 'Clothing',
    itemDisplayNames: ['Puffy/down jacket', 'Shell jacket', 'Bibs/pants', 'Baselayer - top and bottom', 'Mid-layer(s)', 'Touring gloves, warm gloves, extra gloves or liners', 'Cap, buff, toque (beanie)', 'Socks and spare pair']
  },
  dayFoodList: {
    activity:'ski',
    listTitle: 'Food (Day Trip)',
    itemDisplayNames: ['1.5L water', 'Sandwich', 'Nuts', 'Clif bar', 'Apple', 'Thermos of tea']
    },
  overnightFoodList: {
    activity:'ski',
    listTitle: 'Food (Overnight Trip)',
    itemDisplayNames: ['1.5L water', '1x sandwich/day', '1 x portion of nuts/day', '1.5x clif bar/day', '1x apple/2days', 'Thermos of tea', '~500 calories of dehydrated meal/night', '2/3 cups of oatmeal with added dried fruit, nuts and sugar/morning', 'Coffee and tea', 'Ample chocolate/treats']
  },
  campingList: {
    listTitle: 'Camping',
    itemDisplayNames: ['Tent', 'Sleeping bag', 'Sleeping mat', 'Headlamp', 'Nalgene bottle (for drinking and as sleeping bag warmer)', 'Additional water bottle or hydration bladder', 'Camping stove and gas', 'Eating kit - bowl/tupperware, cup, fork/spoon', 'Knife/multitool', 'Rubbish bags', 'Toiletries - washcloth, toothbrush, toothpaste', 'First aid kit', 'Insect repellant and sunscreen', 'Poo kit - wag bag or trowel, toilet paper, toilet-paper-bag']
  }
}

const bikeLists = {
  gearList: {
    activity: 'bike',
    listTitle: 'Gear',
    itemDisplayNames: ['Helmet', 'Knee and elbow pads', 'Goggles/riding glasses', 'Multitool', 'Handheld bike pump', 'Zipties', 'Spare tube/patch kit', 'Tyre levers', 'Knife', 'Headtorch', 'Medical kit', 'Goggle/glasses wipe']
  },
  clothingList: {
    activity: 'bike',
    listTitle: 'Clothing',
    itemDisplayNames: ['Jersey', 'Bike shorts', 'Rainjacket', 'Gloves']
  },
  foodList: {
    activity: 'bike',
    listTitle: 'Food',
    itemDisplayNames: ['1L water', 'Apple', '2x clif bars', 'Sandwich (for full day trips)']
  }
}

// Create and name some global targets
const skiTouringRadioTarget = $('ski-touring-radio');
const mountainBikingRadioTarget = $('mountain-biking-radio');
const dayOrOvernightTarget = $('day-or-overnight-selection')
const dayTripRadioTarget = $('day-trip-radio');
const overnightTripRadioTarget = $('overnight-trip-radio');

/* Event listeners:
Depending on whether the user selects 'ski touring' vs 'mountain biking', or 'day trip' vs 'overnight trip', the relevant lists will appear, and the irrelevant lists will be disappear */
skiTouringRadioTarget.addEventListener('change', function() {
  displayDayOrOvernightQuestion();
  removeList(bikeLists.gearList);
  removeList(bikeLists.clothingList);
  removeList(bikeLists.foodList);
  renderList(skiLists.gearList);
  renderList(skiLists.clothingList);
});

mountainBikingRadioTarget.addEventListener('change', function() {
  hideDayOrOvernightQuestion();
  removeList(skiLists.gearList);
  removeList(skiLists.clothingList);
  removeList(skiLists.dayFoodList);
  removeList(skiLists.overnightFoodList);
  removeList(skiLists.campingList);
  renderList(bikeLists.gearList);
  renderList(bikeLists.clothingList);
  renderList(bikeLists.foodList);
});

dayTripRadioTarget.addEventListener('change', function() {
  removeList(skiLists.overnightFoodList);
  removeList(skiLists.campingList);
  renderList(skiLists.dayFoodList);
});

overnightTripRadioTarget.addEventListener('change', function() {
  removeList(skiLists.dayFoodList);
  renderList(skiLists.overnightFoodList);
  renderList(skiLists.campingList);
})