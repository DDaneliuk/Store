// document.querySelectorAll("input[type=checkbox]").onclick = function (el) {
//   var fill = el.value;
//   console.log(fill);

//   var empty = [].filter.call(textinputs, function (el) {
//     console.log(el.checked);
//     return el.checked;
//   });
// };
// const colorBtn = document.querySelectorAll("input[type=checkbox]");
// for (const button of colorBtn) {
//   button.addEventListener("click", function (event) {
//     var get = event.target.value;
//     var color = document.getElementById(get);
//     if (color.checked) {
//       console.log("ok - checked");
//       console.log(color);
//       FilterColor(color.value);
//       disp(currentData);
//       console.log(currentData);
//     }
//     console.log(event.target.value);
//   });
// }

// function FilterColor(color) {
//   currentData = allData.filter(function (element) {
//     element.color == color;
//     return element.color == color;
//   });
// }
