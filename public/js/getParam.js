const getParam = (name) => {
  if (
    (name = new RegExp("[?&]" + encodeURIComponent(name) + "=([^&]*)").exec(
      location.search
    ))
  )
    return decodeURIComponent(name[1]);
};

const getParamAndValidateObjectId = (name, redirectUrl) => {
  let parentId = getParam(name);
  if (!parentId || parentId.length !== 24) {
    window.location.href = redirectUrl;
  }
  return parentId;
};
