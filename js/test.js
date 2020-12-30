function FilterColor(color) {
  arr = [];
  currentColorData = allData.map(function (item, index) {
    if (color.includes(item.color)) {
      arr.push(item);
    }
  });
  console.log(arr);
  return arr;
}

// let listCurFilt = ["b", "r"];
// let items = [
//   {name: "1", color: "g"},
//   {name: "2", color: "r"},
//   {name: "3", color: "b"},
//   {name: "4", color: "g"},
// ];
