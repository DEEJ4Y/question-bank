const page = getParam("page") || 1;

const getQuestions = async () => {
  let subjectId = getParamAndValidateObjectId("subject", "/subjects");
  let subjectName = getParam("name");
  if (!subjectName) {
    // window.location.href = "/subjects";
    subjectName = "Questions";
  }
  let data = await getQuestionsService(subjectId);
  if (data) {
    let questionsHtml = ``;

    if (!data || !data.data.docs) {
      questionsHtml = `
    <div class="mt-5 text-center">
      <p class="text-danger">Oops! Something went wrong ❌. Please try again later.</p>
    </div>`;
    } else {
      let questions = [...data.data.docs];
      if (questions.length === 0) {
        questionsHtml = `
      <div class="mt-5 text-center">
        <p class="text-info">There are no questions as yet.</p>
        <p>Be the first to add a question.</p>
        <a href="/subjects/questions/add/?subject=${subjectId}">
          <button class="btn btn-outline-secondary">Add a question 🚀</button>
        </a>
      </div>`;
      } else {
        let currentPage = Number(data.data.page);
        let totalPages = data.data.pages;
        let pagination = `
          <li class="page-item${currentPage === 1 ? " disabled" : ""}">
            <a class="page-link" href="/subjects/questions/?subject=${subjectId}&name=${subjectName}&page=${
          Number(page) - 1
        }">Previous</a>
          </li>
        `;
        for (let i = 1; i <= totalPages; i++) {
          pagination += `
            <li class="page-item${
              currentPage === i ? " active" : ""
            }"><a class="page-link" href="/subjects/questions/?subject=${subjectId}&name=${subjectName}&page=${i}">${i}</a></li>
          `;
        }
        pagination += `
          <li class="page-item${currentPage === totalPages ? " disabled" : ""}">
            <a class="page-link" href="/subjects/questions/?subject=${subjectId}&name=${subjectName}&page=${
          Number(page) + 1
        }">Next</a>
          </li>
        `;
        document.getElementById("add-questions").innerHTML = `
        <div class="row text-center mb-3">
          <a href="/subjects/questions/add/?subject=${subjectId}">
            <button class="btn btn-outline-secondary">Add a question 🚀</button>
          </a>
          <nav aria-label="Page navigation example" class="text-center mt-3 d-flex justify-content-center">
            <ul class="pagination">
            ${pagination}
            </ul>
          </nav>
        </div>`;
        questions.forEach((questionObj) => {
          questionsHtml += `
          <div class="p-2 col-lg-4 col-sm-6 col-12">
            <div class="p-3 shadow rounded h-100">          
              <div class="h6">❓ ${questionObj.question[0].slice(0, 50)}</div>
              <div>
                <a class="mb-1" href="/subjects/questions/view/?id=${
                  questionObj.id
                }">
                  <button class="btn btn-sm btn-outline-success">See Question 🚀</button>
                </a>
              </div>
            </div>
          </div>`;
        });
      }
    }
    document.getElementById("subject").innerText = `📔 ${subjectName}`;
    document.getElementById("questions-list").innerHTML = questionsHtml;
  }
};

const getQuestionsService = async (subjectId) => {
  try {
    let res = await fetch(
      `/api/v1/questions?parentId=${subjectId}&page=${page}`,
      {
        method: "GET",
      }
    );
    // console.log(res);
    if (res.status === 200) {
      const resData = await res.json();
      // console.log(resData);
      return resData;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getQuestions();
