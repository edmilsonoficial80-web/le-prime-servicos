import { useNavigate } from "react-router-dom";


export default function AcessoProfissionalPage(){


const navigate = useNavigate();



const profissionais = JSON.parse(

localStorage.getItem("leprime_profissionais") || "[]"

);




const avaliacoes = JSON.parse(

localStorage.getItem("leprime_avaliacoes") || "[]"

);









function entrarPainel(id:number){


navigate(

`/painel-profissional/${id}`

);


}







function calcularNota(id:number){


const lista = avaliacoes.filter(

(a:any)=>

String(a.profissionalId) === String(id)

);



if(lista.length === 0){

return null;

}




const total = lista.reduce(

(soma:any,a:any)=>

soma + Number(a.nota),

0

);



return (

total / lista.length

).toFixed(1);



}








return (


<div

style={{

minHeight:"100vh",

background:"#F5F7F2",

padding:"40px 20px"

}}

>




<h1

style={{

textAlign:"center"

}}

>

Acesso Profissional

</h1>




<p

style={{

textAlign:"center"

}}

>

Escolha o seu perfil para entrar.

</p>







<div

style={{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(280px,1fr))",

gap:25

}}

>






{

profissionais.map(

(profissional:any)=>(



<div

key={profissional.id}

className="card"

style={{

textAlign:"center"

}}

>





<div

style={{

fontSize:45

}}

>

👤

</div>






<h2>

{profissional.nome}

</h2>





<h3

style={{

color:"#082654"

}}

>

🔧 {profissional.profissao}

</h3>





<p>

📍 {profissional.cidade}

</p>






{

calcularNota(profissional.id) && (


<p>

⭐ {calcularNota(profissional.id)}

</p>


)

}







{

calcularNota(profissional.id) && (


<p>

🏆 Profissional recomendado

</p>


)

}








<button

onClick={()=>entrarPainel(profissional.id)}

>

Entrar no painel

</button>






</div>


)


)


}




</div>




</div>


);


}