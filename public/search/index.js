const getSearchResults = async () => {
  let searchQuery = getParam("search");
  let data = await getSearchResultsService(searchQuery);
  if (!data || !data.data) {
    document.getElementById("questions").innerHTML = `
      <h1 class="text-center mb-4">Oops!</h1>
      <p class="text-danger">Something went wrong while fetching your results. Please try again.</p>
    `;
  } else {
    let newHtml = `
      <h1>Results</h1>
      <div class="mb-3">
        <input type="text" class="form-control mb-3" id="search" placeholder="Search 🔍">
        <button id="searchButton" class="btn btn-outline-success">Let's go! 🚀</button>
      </div>
    `;
    let results = data.data;
    if (results.length === 0) {
      newHtml += `
        <p>There are no questions that match your search.</p>
      `;
    } else {
      results.forEach((questionObj) => {
        questionHtml = ``;
        questionObj.question.forEach((questionFragment, idx) => {
          questionHtml += `
            <p>${idx === 0 ? "❓ " : ""}${questionFragment}</p>
          `;
        });
        newHtml += `
          <div class="p-3 mt-3 shadow rounded h-100">          
            <div class="">${questionHtml}</div>
            <div>
              <a class="mb-1" href="/subjects/questions/view/?id=${questionObj._id}">
                <button class="btn btn-sm btn-outline-success">See Question 🚀</button>
              </a>
            </div>
          </div>
        `;
      });
    }

    document.getElementById("questions").innerHTML = newHtml;
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
  }
};

const getSearchResultsService = async (searchQuery) => {
  try {
    let res = await fetch(`/api/v1/questions/s/search/?search=${searchQuery}`);
    if (res.status === 200) {
      let resData = await res.json();
      return resData;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getSearchResults();

const constructSearchAndRedirect = () => {
  let input = document.getElementById("search");
  let value = input.value;
  if (value.length > 0) {
    window.location.href = `/search/?search=${getKeywordsQueryParam(value)}`;
  }
};
