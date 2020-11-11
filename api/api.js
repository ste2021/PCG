let users = [];
const urldominio = "https://api.github.com";
var urlUsers = "users";
var profiles = document.getElementById("lista");
var page = 1;
var params = `search/users?q=+location:Piracicaba&per_page=20&page=${page}`;
var url = `${urldominio}/${params}`;

const accessToken = { token: "50aca22dda5474d5a46ca31ab0831ad883488aab" };
const auth = accessToken.token;
const limit = {
  method: "GET",
  headers: {
    Authorization: "Basic " + btoa(auth),
  },
};

//chamada api
//chamada para todos os usuários
async function getAllUsers() {
    let profileResponse = await fetch(
        `${urldominio}/search/users?q=+type:User+location:Piracicaba&per_page=03&page=${page}`, limit)
    
    let result = await profileResponse.json();
    for (let item of result.items) {
        
        let user = await getUser(item);
        let tmp = document.querySelector("#tmp").content;

        
        let clone = tmp.cloneNode(true); //filhos da div,,, usa o true para percorrer pelos elementos h2 e h4
        clone.querySelector(".link").addEventListener( //evento click no link ver perfil pr chamar a function exibirUser
               "click", function (e) {
                e.preventDefault();
                exibirUser(user);
          }
        );
        clone.querySelector('.imga').src = user.avatar_url;
        clone.querySelector('.name').innerText = user.name;
        clone.querySelector('.Seguidores').innerText = (user.followers) + "   Seguidores";
        clone.querySelector('.Repos').innerText = user.public_repos + "  Repositórios";
        clone.querySelector('.Type').innerText = user.type;
        
        profiles.appendChild(clone);
        
    }
}
const listarUsers = getAllUsers();
// getAllUsers().then(indice => {
// console.log(indice.user);
// });
//puxar os dados (nome, repositorio )
async function getUser(user) {
    const userUrl = user.url;
    const userResponse = await fetch(userUrl);
    const userResult = await userResponse.json();

    return userResult;
};