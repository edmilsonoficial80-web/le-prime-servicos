import { useNavigate } from "react-router-dom";


export default function HomePage(){


const navigate = useNavigate();



return (

<div

style={{

background:"#F5F7F2",

minHeight:"100vh"

}}

>




<section

style={{

background:"#061B41",

color:"#fff",

height:"300px",

display:"flex",

flexDirection:"column",

alignItems:"center",

justifyContent:"center",

textAlign:"center"

}}

>




<h2

style={{

margin:0,

fontSize:"24px"

}}

>

L&E Prime

</h2>





<h3

style={{

color:"#B8F000",

margin:"10px 0"

}}

>

Gerimos serviços.

<br/>

Entregamos soluções.

</h3>






<p

style={{

fontSize:"13px"

}}

>

Encontre profissionais de confiança para sua casa ou empresa.

</p>







<div

style={{

display:"flex",

gap:"12px",

marginTop:"15px"

}}

>




<button

onClick={()=>navigate("/servicos")}

style={{

background:"#B8F000",

border:"none",

padding:"10px 20px",

borderRadius:"8px",

fontWeight:"bold",

cursor:"pointer"

}}

>

Ver serviços

</button>






<button

onClick={()=>navigate("/registro/profissional")}

style={{

background:"transparent",

color:"#B8F000",

border:"1px solid #B8F000",

padding:"10px 20px",

borderRadius:"8px",

fontWeight:"bold",

cursor:"pointer"

}}

>

Sou profissional

</button>




</div>





</section>








<section

style={{

padding:"30px 20px"

}}

>



<h2

style={{

textAlign:"center",

color:"#061B41"

}}

>

Serviços disponíveis

</h2>







<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",

gap:"20px"

}}

>





<div className="card">

<h3>🔧 Eletricista</h3>

<p>

Instalações e reparações elétricas.

</p>

</div>





<div className="card">

<h3>🚰 Canalizador</h3>

<p>

Reparações hidráulicas e manutenção.

</p>

</div>






<div className="card">

<h3>🎨 Pintor</h3>

<p>

Pintura residencial e comercial.

</p>

</div>






</div>







<button

onClick={()=>navigate("/servicos")}

style={{

display:"block",

margin:"30px auto",

background:"#061B41",

color:"#fff",

border:"none",

padding:"12px 25px",

borderRadius:"8px",

fontWeight:"bold",

cursor:"pointer"

}}

>

Ver todos os serviços

</button>





</section>







</div>


);

}