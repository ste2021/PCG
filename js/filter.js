const searching = document.getElementById("inputsearch");
let to;

async function getFilterUsers(search) {
  let profileResponse = await fetch(`https://api.github.com/search/users?q=${search}+type:User+location:Piracicaba`, limit)
  let result = await profileResponse.json();

  return result;
}
getFilterUsers();


function debounce(event){
  clearTimeout(to);
    to = setTimeout(() =>{
    const user = event.target.value;
 
  if (user.length > 0) {
    filtrado = true;    
    getFilterUsers(user).then(async res => 
       {
      // let result = await res.json();
      profiles.innerHTML = ""; //limpa o profile para receber os resultados                                  
      for (let item of res.items) {
        //cards usuarios
        let user = await getUser(item);
        let tmp = document.querySelector("#tmp").content;
        let clone = tmp.cloneNode(true); //filhos da div,,, usa o true para percorrer pelos elementos h2 e h4
        clone.querySelector(".link").addEventListener( //evento click no link ver perfil pr chamar a function exibirUser
            "click", function (e) {
                e.preventDefault();
                exibirUser(user);
            });
        clone.querySelector('.imga').src = user.avatar_url;
        clone.querySelector('.name').innerText = user.name;
        clone.querySelector('.Seguidores').innerText = (user.followers) + "   Seguidores";
        clone.querySelector('.Repos').innerText = user.public_repos + "  Repositórios";
        clone.querySelector('.Type').innerText = user.type;
        profiles.appendChild(clone);
    }
    removerLoad(false);
    } );
  }
  else {
    filtrado= false;
    profiles.innerHTML = "";
    getAllUsers();
    pegarPiracicabanos();
    mostrarLoad();
    
  }
  }, 600);
}

searching.addEventListener("input", event => {
  debounce(event);
 
});
// 
// searching.addEventListener('input', () => {
//   console.log('ola')
// })

