import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import { useState } from 'react';
import { useEffect } from 'react';
import fusca from './imgs/fusca.jpg'
import audi from './imgs/audi.png'
import bmw from './imgs/bmw.jpg'
import chevrolet from './imgs/chevrolet.jpg'
import citroen from './imgs/citroen.jpg'
import honda from './imgs/honda.jpg'
import hyundai from './imgs/hyundai.jpg'
import mercedes from './imgs/mercedes.jpg'
import nissan from './imgs/nissan.jpg'
import peugeot from './imgs/peugeot.jpg'
import renault from './imgs/renault.jpg'
import toyota from './imgs/toyota.jpg'
import volkswagen from './imgs/volwswagen.jpg'
const lista24falses=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
function App() {
  const imagens=[audi,bmw,chevrolet,citroen,honda,hyundai,mercedes,nissan,peugeot,renault,toyota,volkswagen]
  const array=[0,1,2,3,4,5,6,7,8,9,10,11,0,1,2,3,4,5,6,7,8,9,10,11]
  const [emb,setEmb]=useState(false)
  function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  }
  const [erros,setErros]=useState(0)
  const [tipo,setTipo]=useState(false)
  const [jogo,setJogo]=useState([])
  const [placar,setPlacar]=useState([0,0])
  const [vez,setVez]=useState(0)
  const [show,setShow]=useState(lista24falses)
  const [achados,setAchados]=useState(lista24falses)
  useEffect(()=>{setEmb(shuffle(array))},[])
  useEffect(()=>{
    const quemJogou=vez
    if(jogo.length==0)setShow(lista24falses)
    if(jogo.length==1){
      const ar=[]
      for(let k=0;k<24;k++){
        if(k==jogo[0]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
    }
    if(jogo.length==2){
      const ar=[]
      for(let k=0;k<24;k++){
        if(k==jogo[0]||k==jogo[1]){ar.push(true)}else{ar.push(false)}
      }
      setShow(ar)
      setVez(null)

      setTimeout(()=>{
        if(emb[jogo[0]]==emb[jogo[1]]){
          const ar=[]
          for(let k=0;k<24;k++){
            if(k==jogo[0]||k==jogo[1]){ar.push(true)}else{ar.push(achados[k])}
          }
          let pontos0=placar[0]
          let pontos1=placar[1]
          if(vez==0)pontos0++
          if(vez==1)pontos1++
          setPlacar([pontos0,pontos1])
          setJogo([])
          setAchados(ar)
          setVez(quemJogou)
        }else{
          setErros(erros+1)
          setJogo([])
          setVez(quemJogou==0?1:0)
        }
      },2000)
    }
  },[jogo])
  return (
    <Tudo>
      {
        tipo==false?<Placar>
          <button onClick={()=>setTipo(1)}>
            solo
          </button>
          <button onClick={()=>setTipo(2)}>
            confronto
          </button>
        </Placar>:
        tipo==1?<Placar>
          <h1>{erros}</h1>
          {vez===null?<></>:<h2>go!</h2>}
        </Placar>:<Placar>
        <h1>{placar[0]}</h1>
        <h2>{placar[1]}</h2>
        {vez===null?<></>:vez==0?<h1>go!</h1>:<h2>go!</h2>}
        </Placar>
      }
      {!emb||!tipo?<></>:<Deck>
        {emb.map((num,index)=>(achados[index]?<Kard></Kard>:<Card onClick={()=>setJogo([...jogo,index])}>
            {!show[index]?<section><img src={fusca}/></section>:
            <article><img src={imagens[num]}/></article>}
          </Card>))}
        </Deck>}
    </Tudo>
  );
}

export default App;
const Placar=styled.div`
button{cursor:pointer;
  width:90px;height:40px;
  margin:20px 20px 0 20px;
  border:0;border-radius:10px;
  background-color:orange;
}
height:80px;display:flex;
font-size:20px;
h1{color:red;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
h2{color:blue;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
`
const Kard=styled.div`
height:15%;width:22%;
`
const Card=styled.div`cursor:pointer;
display:flex;justify-content:center;align-items:center;
height:18%;width:18%;background-color:white;border-radius:10px;
section{img{width:100%;border-radius:10px;}};
article{img{width:100%}}
`
const Deck=styled.div`
width:100%;height:140vw;display:flex;flex-wrap:wrap;
justify-content:space-evenly;align-items:space-evenly;

`
const Tudo=styled.div`
width:100vw;height:100vh;
background-color:#e8e6b0
`
