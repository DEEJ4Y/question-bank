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
        document.getElementById("add-questions").innerHTML = `
        <div class="row text-center mb-3">
          <a href="/subjects/questions/add/?subject=${subjectId}">
            <button class="btn btn-outline-secondary">Add a question 🚀</button>
          </a>
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
    let res = await fetch(`/api/v1/questions?parentId=${subjectId}`, {
      method: "GET",
    });
    // console.log(res);
    if (res.status === 200) {
      return await res.json();
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getQuestions();
