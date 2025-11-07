const FetchContext = createContext();

export const useFetchAction = () => useContext(FetchContext);

export const fetchDataPost = async ( url, options = {}) => {
  const response = await fetch(url, {
    method: options.method,
    headers: {
      "Content-Type" : "application/json"
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  })
  
  response.then(res => res.json())
  .then(({message, data}) => {
    let accessToken = data.accessToken;
    localStorage.setItem("accessToken", accessToken)
    alert(message)
  })
}

export const option = {}

option.postOption = (data) => {
  const option = {
    method: "POST",
    body: data
  }

  return option
}

option.getOption = (data) => {
  const option = {
    method: "GET",
    body: data ? data : undefined
  }

  return option
}

option.putOption = (data) => {
  const option = {
    method: "PUT",
    body: data ? data : undefined
  }

  return option
}

option.deleteOption = (data) => {
  const option = {
    method: "PUT",
    body: data ? data : undefined
  }

  return option
}