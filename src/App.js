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
import ferrari from './imgs/ferrari.jpg'
import fiat from './imgs/fiat.jpg'
import ford from './imgs/ford.png'
import kia from './imgs/kia.png'
import lamborghini from './imgs/lamborghini.jpg'
import landrover from './imgs/landrover.jpg'
import maserati from './imgs/maserati.png'
import mitsubishi from './imgs/mitsubishi.png'
import porsche from './imgs/porsche.jpg'
import ram from './imgs/ram.png'
import suzuki from './imgs/suzuki.png'
import volvo from './imgs/volvo.jpg'
const lista24falses=[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,]
function App() {
  const marcas=[audi,bmw,chevrolet,citroen,
    renault,toyota,volkswagen,ferrari,
    honda,hyundai,fiat,ford,kia,lamborghini,landrover,mercedes,nissan,peugeot,
    maserati,mitsubishi,
    porsche,ram,suzuki,volvo]
    const [imagens,setImagens]=useState(false)
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
  useEffect(()=>{
    setImagens(shuffle(marcas))
    setEmb(shuffle(array))
  },[])
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
          let acabou=true
          for(let item of ar){
            if(!item)acabou=false
          }
          if(acabou){
            setTipo(tipo==1?`
            Boaaa! 
            Você completou errando apenas ${erros}
            `:`
            ${pontos0>pontos1?'Vermelho':pontos1>pontos0?'Azul':'Empatou!'} ${pontos0==pontos1?'':'ganhou!'} 
            Placar: ${pontos0>pontos1?pontos0:pontos1} a ${pontos0<pontos1?pontos0:pontos1}
            `)
          }
        }else{
          setErros(erros+1)
          setJogo([])
          setVez(quemJogou==0?1:0)
        }
      },1700)
    }
  },[jogo])
  console.log(achados)
  return (
    tipo==false?
    <Tudo>
          <Btn cor={true} onClick={()=>setTipo(1)}>
            solo
          </Btn>
          <Btn  onClick={()=>setTipo(2)}>
            confronto
          </Btn>
    </Tudo>:
    tipo!=1&&tipo!=2?
    <Tudo>
      <h6>{tipo}</h6>
    </Tudo>:
    <Tudo>
      {
        tipo==1?<Placar>
          <h3>erros: {erros}</h3>
          {vez===null?<Go cor={'transparent'}></Go>:<Go cor={'green'}>go!</Go>}
        </Placar>:<Placar>
        <h1>{placar[0]}</h1>
        
        {vez===null?<Go cor={'transparent'}></Go>:vez==0?<Go cor={'#f20707'}>go!</Go>:<Go cor={'#2320d6'}>go!</Go>}
        <h2>{placar[1]}</h2>
        </Placar>
      }
      {!emb||!tipo?<></>:<Deck>
        {emb.map((num,index)=>(achados[index]?<Kard></Kard>:<Card onClick={()=>{if(jogo.length==1&&jogo[0]==index){}else{setJogo([...jogo,index])}}}>
            {!show[index]?<section><img src={fusca}/></section>:
            <article><img src={imagens[num]}/></article>}
          </Card>))}
        </Deck>}
    </Tudo>
  );
}

export default App;
const Go=styled.div`
display:flex;justify-content:center;align-items:center;
color:white;box-sizing:border-box;
background-color:${props=>props.cor};
width:90px;height:50px;border-radius:25px;
margin:15px 15px 0 20px;padding-bottom:8px;
font-weight:600;font-size:35px;
`
const Placar=styled.div`
width:100%;
height:80px;display:flex;justify-content:space-evenly;
font-size:20px;
h1{width:20px;color:#f20707;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
h2{width:20px;color:#2320d6;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
h3{width:;color:black;font-weight:600;font-size:35px;margin:15px 15px 0 20px;}
`
const Kard=styled.div`
height:15.3%;width:23%;
`
const Card=styled.div`cursor:pointer;

height:15.3%;width:23%;background-color:white;border-radius:10px;
section{img{width:100%;border-radius:10px;}};
article{width:100%;height:100%;
  display:flex;justify-content:center;align-items:center;
  img{width:85%;}
}
`
const Deck=styled.div`
width:98.5%;height:147.7vw;display:flex;flex-wrap:wrap;
justify-content:space-evenly;align-items:space-evenly;
@media(min-width:650px){
  width:84%;height:126vw;
} 
`
const Tudo=styled.div`
width:100vw;height:100vh;
background-color:#e8e6b0;
display:flex;flex-direction:column;align-items:center;
h6{color:brown;font-size:30px;width:250px;height:100%;display:flex;justify-content:center;align-items:center;}
`
const Btn=styled.button`
cursor:pointer;font-size:20px;
  width:90%;height:70px;
  margin:${props=>props.cor?'100px 0px 30px 0':''};
  border:0;border-radius:35px;
  background-color:orange;
`