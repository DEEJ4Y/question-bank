const getSubjects = async () => {
  let data = await getSubjectsService();
  if (data) {
    let subjectsHtml = ``;

    if (!data || !data.data.docs) {
      subjectsHtml = `
    <div class="mt-5 text-center">
      <p class="text-danger">Oops! Something went wrong ❌. Please try again later.</p>
    </div>`;
    } else {
      let subjects = [...data.data.docs];
      if (subjects.length === 0) {
        subjectsHtml = `
      <div class="mt-5 text-center">
        <p class="text-info">There are no subjects as yet.</p>
        <p>Be the first to add a subject.</p>
        <a href="/subjects/add">
          <button class="btn btn-outline-secondary">Add a subject 🚀</button>
        </a>
      </div>`;
      } else {
        document.getElementById("add-subjects").innerHTML = `
        <div class="row text-center mb-3">
          <a href="/subjects/add">
            <button class="btn btn-outline-secondary">Add a subject 🚀</button>
          </a>
        </div>`;
        subjects.forEach((subject) => {
          subjectsHtml += `
        <div class="p-2 col-lg-4 col-sm-6 col-12">
          <div class="p-3 shadow rounded h-100">          
            <div class="h6">📔 ${subject.name}</div>
            <div>
              <a class="mb-1" href="/subjects/questions/?subject=${subject.id}&name=${subject.name}">
                <button class="btn btn-sm btn-outline-success">See Questions 🚀</button>
              </a>
              <a class="mb-1" href="/subjects/questions/add/?subject=${subject.id}">
                <button class="btn btn-sm btn-outline-secondary">Add a question 🚀</button>
              </a>
            </div>
          </div>
        </div>`;
        });
      }
    }

    document.getElementById("subjects-list").innerHTML = subjectsHtml;
  }
};

const getSubjectsService = async () => {
  try {
    let res = await fetch("/api/v1/subjects", {
      method: "GET",
    });
    if (res.status === 200) {
      const resData = await res.json();
      // console.log(resData);
      return await resData;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

getSubjects();
