const constructSearchAndRedirect = () => {
  let input = document.getElementById("search");
  let value = input.value;
  if (value.length > 0) {
    window.location.href = `/search/?search=${getKeywordsQueryParam(value)}`;
  }
};
// Listen for enter keypress
document.getElementById("search").addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    // Cancel the default action, if needed
    e.preventDefault();
    // Trigger the button element with a click
    constructSearchAndRedirect();
  }
});

document
  .getElementById("searchButton")
  .addEventListener("click", constructSearchAndRedirect);
